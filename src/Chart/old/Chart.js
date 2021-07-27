import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from 'openlayers';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

const styles = theme => ({
    dataset: {},
    content: {
	height:'100vh',
	padding: theme.spacing(1),
	backgroundColor:'gold',
    },
    root: {
	height: '100%',
	padding:0,
	margin:0,
	border: '0px solid red',
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
    },
    invisible:{border:0,padding:0},
    map: {
	backgroundColor:'LightTurquoise',
//	backgroundColor:'Gray',
	overflow: 'hidden',
	height: '100%',
    },
    button:{},
    buttonInvisible:{},
    buttonDisabled:{},
});



var vectorSource= new ol.source.Cluster({
  distance: 40,
  source: new ol.source.Vector({
    url: 'https://openlayers.org/en/latest/examples/kml-earthquakes.html',
    format: new ol.format.KML({
      extractStyles: false
    })
  })
});

var tileSource = new ol.source.Stamen({
  layer: 'toner'
});

var selectCondition = function(evt) {
  return evt.originalEvent.type == 'mousemove' ||
    evt.type == 'singleclick';
};

var cluster = new custom.style.ClusterStyle(vectorSource);

export class Chart extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }
  render(){
    const { classes } = this.props;
    return (
      <div  className={classes.content}>
        <Map view={{center: [0,0], zoom:2}}>
          <Interactions>
            <interaction.Select
             condition={selectCondition} 
             style={cluster.selectStyleFunction} />
          </Interactions>
          <Layers>
            <layer.Tile source={tileSource}/>
            <layer.Vector 
              source={vectorSource} 
              style={cluster.vectorStyleFunction}/>
          </Layers>
        </Map>
      </div>
    );
  }
}


Chart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chart);
