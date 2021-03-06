/**
 * @module ol/renderer/webgl/WebGLSlideLayer
 */
import BaseVector from 'ol/layer/BaseVector.js';
import GeometryType from 'ol/geom/GeometryType.js';
import VectorEventType from 'ol/source/VectorEventType.js';
import ViewHint from 'ol/ViewHint.js';
import WebGLArrayBuffer from 'ol/webgl/Buffer.js';
import WebGLLayerRenderer, { WebGLWorkerMessageType, colorDecodeId, colorEncodeId, } from './WebGLRenderer.js'; // ol/renderer/webgl/Layer.js
import WebGLRenderTarget from 'ol/webgl/RenderTarget.js';
import { ARRAY_BUFFER, DYNAMIC_DRAW, ELEMENT_ARRAY_BUFFER } from 'ol/webgl.js';
import { AttributeType, DefaultUniform } from 'ol/webgl/Helper.js';
import { apply as applyTransform, create as createTransform, makeInverse as makeInverseTransform, multiply as multiplyTransform, } from 'ol/transform.js';
import { assert } from 'ol/asserts.js';
import { buffer, createEmpty, equals } from 'ol/extent.js';
import { create as createWebGLWorker } from 'ol/worker/webgl.js';
import { getUid } from 'ol/util.js';
import { listen, unlistenByKey } from 'ol/events.js';


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @typedef {Object} CustomAttribute A description of a custom attribute to be passed on to the GPU, with a value different
 * for each slide.
 * @property {string} name Attribute name.
 * @property {function(import("../../Slide").default, Object<string, *>):number} callback This callback computes the numerical value of the
 * attribute for a given slide (properties are available as 2nd arg for quicker access).
 */
/**
 * @typedef {Object} SlideCacheItem Object that holds a reference to a slide, its geometry and properties. Used to optimize
 * rebuildBuffers by accessing these objects quicker.
 * @property {import("../../Slide").default} slide Slide
 * @property {Object<string, *>} properties Slide properties
 * @property {import("../../geom").Geometry} geometry Slide geometry
 */
/**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the canvas element.
 * @property {Array<CustomAttribute>} [attributes] These attributes will be read from the slides in the source and then
 * passed to the GPU. The `name` property of each attribute will serve as its identifier:
 *  * In the vertex shader as an `attribute` by prefixing it with `a_`
 *  * In the fragment shader as a `varying` by prefixing it with `v_`
 * Please note that these can only be numerical values.
 * @property {string} vertexShader Vertex shader source, mandatory.
 * @property {string} fragmentShader Fragment shader source, mandatory.
 * @property {Object.<string,import("../../webgl/Helper").UniformValue>} [uniforms] Uniform definitions for the post process steps
 * Please note that `u_texture` is reserved for the main texture slot.
 * @property {Array<import("./Layer").PostProcessesOptions>} [postProcesses] Post-processes definitions
 */
/**
 * @classdesc
 * WebGL image renderer optimized for slide show.
 * All slides will be rendered as quads (two triangles forming a square). New data will be flushed to the GPU
 * every time the slide source changes.
 *
 * You need to provide vertex and fragment shaders for rendering. This can be done using
 * {@link module:ol/webgl/ShaderBuilder} utilities. These shaders shall expect a `a_position` attribute
 * containing the screen-space projected center of the quad, as well as a `a_index` attribute
 * whose value (0, 1, 2 or 3) indicates which quad vertex is currently getting processed (see structure below).
 *
 * To include variable attributes in the shaders, you need to declare them using the `attributes` property of
 * the options object like so:
 * ```js
 * new WebGLSlideLayerRenderer(layer, {
 *   attributes: [
 *     {
 *       name: 'size',
 *       callback: function(slide) {
 *         // compute something with the slide
 *       }
 *     },
 *     {
 *       name: 'weight',
 *       callback: function(slide) {
 *         // compute something with the slide
 *       }
 *     },
 *   ],
 *   vertexShader:
 *     // shader using attribute a_weight and a_size
 *   fragmentShader:
 *     // shader using varying v_weight and v_size
 * ```
 *
 * The following uniform is used for the main texture: `u_texture`.
 *
 * Please note that the main shader output should have premultiplied alpha, otherwise visual anomalies may occur.
 *
 * Slide are rendered as quads with the following structure:
 *
 * ```
 *   (u0, v1)      (u1, v1)
 *  [3]----------[2]
 *   |`           |
 *   |  `         |
 *   |    `       |
 *   |      `     |
 *   |        `   |
 *   |          ` |
 *  [0]----------[1]
 *   (u0, v0)      (u1, v0)
 *  ```
 *
 * This uses {@link module:ol/webgl/Helper~WebGLHelper} internally.
 *
 * @api
 */
var WebGLSlideLayerRenderer = /** @class */ (function (_super) {
    __extends(WebGLSlideLayerRenderer, _super);
    /**
     * @param {import("../../layer/Layer.js").default} layer Layer.
     * @param {Options} options Options.
     */
    function WebGLSlideLayerRenderer(layer, options) {
        var _this = this;
        var uniforms = options.uniforms || {};
        var projectionMatrixTransform = createTransform();
        uniforms[DefaultUniform.PROJECTION_MATRIX] = projectionMatrixTransform;
        _this = _super.call(this, layer, {
            className: options.className,
            uniforms: uniforms,
            postProcesses: options.postProcesses,
        }) || this;
        _this.sourceRevision_ = -1;
        _this.verticesBuffer_ = new WebGLArrayBuffer(ARRAY_BUFFER, DYNAMIC_DRAW);
        _this.indicesBuffer_ = new WebGLArrayBuffer(ELEMENT_ARRAY_BUFFER, DYNAMIC_DRAW);
        _this.program_ = _this.helper.getProgram(options.fragmentShader, options.vertexShader);
        /**
         * @type {boolean}
         * @private
         */
        var customAttributes = options.attributes
            ? options.attributes.map(function (attribute) {
                return {
                    name: 'a_' + attribute.name,
                    size: 1,
                    type: AttributeType.FLOAT,
                };
            })
            : [];
        /**
         * A list of attributes used by the renderer. By default only the position and
         * index of the vertex (0 to 3) are required.
         * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
         */
        _this.attributes = [
            {
                name: 'a_position',
                size: 2,
                type: AttributeType.FLOAT,
            },
            {
                name: 'a_index',
                size: 1,
                type: AttributeType.FLOAT,
            },
        ].concat(customAttributes);
        _this.customAttributes = options.attributes ? options.attributes : [];
        _this.previousExtent_ = createEmpty();
        /**
         * This transform is updated on every frame and is the composition of:
         * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
         * - current world->screen transform
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.currentTransform_ = projectionMatrixTransform;
        /**
         * This transform is updated when buffers are rebuilt and converts world space coordinates to screen space
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.renderTransform_ = createTransform();
        /**
         * @type {import("../../transform.js").Transform}
         * @private
         */
        _this.invertRenderTransform_ = createTransform();
        /**
         * @type {Float32Array}
         * @private
         */
        _this.renderInstructions_ = new Float32Array(0);
        _this.worker_ = createWebGLWorker();
        _this.worker_.addEventListener('message', 
        /**
         * @param {*} event Event.
         * @this {WebGLSlideLayerRenderer}
         */
        function (event) {
            var received = event.data;
            if (received.type === WebGLWorkerMessageType.GENERATE_BUFFERS) {
                var projectionTransform = received.projectionTransform;
                this.verticesBuffer_.fromArrayBuffer(received.vertexBuffer);
                this.helper.flushBufferData(this.verticesBuffer_);
                this.indicesBuffer_.fromArrayBuffer(received.indexBuffer);
                this.helper.flushBufferData(this.indicesBuffer_);
                this.renderTransform_ = projectionTransform;
                makeInverseTransform(this.invertRenderTransform_, this.renderTransform_);
                this.renderInstructions_ = new Float32Array(event.data.renderInstructions);
                this.getLayer().changed();
            }
        }.bind(_this));
        /**
         * This object will be updated when the source changes.
         * @type {Object<string, SlideCacheItem>}
         * @private
         */
        _this.slideCache_ = [];
        /**
         * Amount of slides in the cache.
         * @type {number}
         * @private
         */
        _this.slideCount_ = 0;
	var slides = _this.getLayer().get("slides");
	console.log("Number of slides:",slides.wind.length);



	/**
         * This object will be updated when the source changes. Key is uid.
         * @type {Object<string, SlideCacheItem>}
         * @private
         */
        _this.featureCache_ = {};
        /**
         * Amount of slides in the cache.
         * @type {number}
         * @private
         */
        _this.featureCount_ = 0;
        var source = _this.getLayer().getSource();
        _this.sourceListenKeys_ = [
            listen(source, VectorEventType.ADDSLIDE, _this.handleSourceSlideAdded_, _this),
            listen(source, VectorEventType.CHANGESLIDE, _this.handleSourceSlideChanged_, _this),
            listen(source, VectorEventType.REMOVESLIDE, _this.handleSourceSlideDelete_, _this),
            listen(source, VectorEventType.CLEAR, _this.handleSourceSlideClear_, _this),
        ];
        source.forEachFeature(function (slide) {
            this.featureCache_[getUid(slide)] = {
                slide: slide,
                properties: slide.getProperties(),
                geometry: slide.getGeometry(),
            };
            this.featureCount_++;
        }.bind(_this));
        return _this;
    }
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLSlideLayerRenderer.prototype.handleSourceSlideAdded_ = function (event) {
        var slide = event.slide;
        this.featureCache_[getUid(slide)] = {
            slide: slide,
            properties: slide.getProperties(),
            geometry: slide.getGeometry(),
        };
        this.featureCount_++;
    };
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLSlideLayerRenderer.prototype.handleSourceSlideChanged_ = function (event) {
        var slide = event.slide;
        this.featureCache_[getUid(slide)] = {
            slide: slide,
            properties: slide.getProperties(),
            geometry: slide.getGeometry(),
        };
    };
    /**
     * @param {import("../../source/Vector.js").VectorSourceEvent} event Event.
     * @private
     */
    WebGLSlideLayerRenderer.prototype.handleSourceSlideDelete_ = function (event) {
        var slide = event.slide;
        delete this.featureCache_[getUid(slide)];
        this.featureCount_--;
    };
    /**
     * @private
     */
    WebGLSlideLayerRenderer.prototype.handleSourceSlideClear_ = function () {
        this.featureCache_ = {};
        this.featureCount_ = 0;
    };
    /**
     * Render the layer.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {HTMLElement} The rendered element.
     */
    WebGLSlideLayerRenderer.prototype.renderFrame = function (frameState) {
        this.preRender(frameState);
        var renderCount = this.indicesBuffer_.getSize();
        this.helper.drawElements(0, renderCount);
        this.helper.finalizeDraw(frameState);
        var canvas = this.helper.getCanvas();
        var layerState = frameState.layerStatesArray[frameState.layerIndex];
        var opacity = layerState.opacity;
        if (opacity !== parseFloat(canvas.style.opacity)) {
            canvas.style.opacity = String(opacity);
        }
        this.postRender(frameState);
        return canvas;
    };
    /**
     * Determine whether render should be called.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @return {boolean} Layer is ready to be rendered.
     */
    WebGLSlideLayerRenderer.prototype.prepareFrame = function (frameState) {
        var layer = this.getLayer();
        var sourceObject = layer.getSource();
        var viewState = frameState.viewState;
        var viewNotMoving = !frameState.viewHints[ViewHint.ANIMATING] &&
            !frameState.viewHints[ViewHint.INTERACTING];
        var extentChanged = !equals(this.previousExtent_, frameState.extent);
        var sourceChanged = this.sourceRevision_ < sourceObject.getRevision();
        if (sourceChanged) {
            this.sourceRevision_ = sourceObject.getRevision();
        }
        if (viewNotMoving && (extentChanged || sourceChanged)) {
            var projection = viewState.projection;
            var resolution = viewState.resolution;
            var renderBuffer = layer instanceof BaseVector ? layer.getRenderBuffer() : 0;
            var extent = buffer(frameState.extent, renderBuffer * resolution);
	    // The next line updates "sourceObject.loadedExtentsRtree_" which is not used....	    
            //sourceObject.loadSlides(extent, resolution, projection);
            this.rebuildBuffers_(frameState);
            this.previousExtent_ = frameState.extent.slice();
        }
        // apply the current projection transform with the invert of the one used to fill buffers
        this.helper.makeProjectionTransform(frameState, this.currentTransform_);
        multiplyTransform(this.currentTransform_, this.invertRenderTransform_);
        this.helper.useProgram(this.program_);
        this.helper.prepareDraw(frameState);
        // write new data to cache and bind buffers
        this.helper.bindBuffer(this.verticesBuffer_);
        this.helper.bindBuffer(this.indicesBuffer_);
	// attach attributes to buffer
        this.helper.enableAttributes(this.attributes);
        return true;
    };
    /**
     * Rebuild internal webgl buffers based on current view extent; costly, should not be called too much
     * @param {import("../../PluggableMap").FrameState} frameState Frame state.
     * @private
     */
    WebGLSlideLayerRenderer.prototype.rebuildBuffers_ = function (frameState) {
        // saves the projection transform for the current frame state
        var projectionTransform = createTransform();
        this.helper.makeProjectionTransform(frameState, projectionTransform);
        // here we anticipate the amount of render instructions that we well generate
        // this can be done since we know that for normal render we only have x, y as base instructions,
        // and we also know the amount of custom attributes to append to these
        var totalInstructionsCount = (2 + this.customAttributes.length) * this.featureCount_;
        if (!this.renderInstructions_ ||
            this.renderInstructions_.length !== totalInstructionsCount) {
            this.renderInstructions_ = new Float32Array(totalInstructionsCount);
        }
        // loop on slides to fill the buffer
        var slideCache, geometry;
        var tmpCoords = [];
        var tmpColor = [];
        var renderIndex = 0;
        for (var slideUid in this.featureCache_) {
            slideCache = this.featureCache_[slideUid];
            geometry = /** @type {import("../../geom").Point} */ (slideCache.geometry);
            if (!geometry || geometry.getType() !== GeometryType.POINT) {
                continue;
            }
            tmpCoords[0] = geometry.getFlatCoordinates()[0];
            tmpCoords[1] = geometry.getFlatCoordinates()[1];
            applyTransform(projectionTransform, tmpCoords);
            this.renderInstructions_[renderIndex++] = tmpCoords[0];
            this.renderInstructions_[renderIndex++] = tmpCoords[1];
            var value = void 0;
            for (var j = 0; j < this.customAttributes.length; j++) {
                value = this.customAttributes[j].callback(slideCache.slide, slideCache.properties);
                this.renderInstructions_[renderIndex++] = value;
            }
        }
        /** @type {import('./Layer').WebGLWorkerGenerateBuffersMessage} */
        var message = {
            type: WebGLWorkerMessageType.GENERATE_BUFFERS,
            renderInstructions: this.renderInstructions_.buffer,
            customAttributesCount: this.customAttributes.length,
        };
        // additional properties will be sent back as-is by the worker
        message['projectionTransform'] = projectionTransform;
        this.worker_.postMessage(message, [this.renderInstructions_.buffer]);
        this.renderInstructions_ = null;
        /** @type {import('./Layer').WebGLWorkerGenerateBuffersMessage} */
    };
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @param {import("../../PluggableMap.js").FrameState} frameState Frame state.
     * @param {import("../vector.js").SlideCallback<T>} callback Slide callback.
     * @return {T|undefined} Callback result.
     * @template T
     */
    WebGLSlideLayerRenderer.prototype.forEachFeatureAtCoordinate = function () {
        return undefined;
    };
    /**
     * Render the hit detection data to the corresponding render target
     * @param {import("../../PluggableMap.js").FrameState} frameState current frame state
     */
    WebGLSlideLayerRenderer.prototype.renderHitDetection = function (frameState) {
        return;
    };
    /**
     * Clean up.
     */
    WebGLSlideLayerRenderer.prototype.disposeInternal = function () {
        this.worker_.terminate();
        this.layer_ = null;
        this.sourceListenKeys_.forEach(function (key) {
            unlistenByKey(key);
        });
        this.sourceListenKeys_ = null;
        _super.prototype.disposeInternal.call(this);
    };
    return WebGLSlideLayerRenderer;
}(WebGLLayerRenderer));
export default WebGLSlideLayerRenderer;
//# sourceMappingURL=WebGLSlideLayer.js.map
