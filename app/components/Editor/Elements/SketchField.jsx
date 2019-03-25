/*eslint no-unused-vars: 0*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import History from './history';
import {uuid4} from './utils';
import Select from './select';
import Pencil from './pencil';
import Line from './line';
import Pan from './pan';
import Rectangle from './rectangle';
import Circle from './circle';
import {tools} from 'constants/tools'
import {useDropzone} from 'react-dropzone'


// const fabric = require('fabric').fabric;
const fabric = window.fabric

function MyDropzone() {
  const {getRootProps, getInputProps} = useDropzone()

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

/**
 * Sketch Tool based on FabricJS for React Applications
 */
class SketchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parentWidth: 550,
      action: true,
      imagefile: false
    }
  }

  _initTools = (fabricCanvas) => {
    this._tools = {};
    this._tools[tools.select.id] = new Select(fabricCanvas);
    this._tools[tools.pencil.id] = new Pencil(fabricCanvas);
    this._tools[tools.line.id] = new Line(fabricCanvas);
    this._tools[tools.rectangle.id] = new Rectangle(fabricCanvas);
    this._tools[tools.circle.id] = new Circle(fabricCanvas);
    this._tools[tools.pan.id] = new Pan(fabricCanvas);
  }

  /**
   * Enable touch Scrolling on Canvas
   */
  enableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) return;
    canvas.allowTouchScrolling = true
  };

  /**
   * Disable touch Scrolling on Canvas
   */
  disableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) {
      canvas.allowTouchScrolling = false
    }
  };

  /**
   * Add an image as object to the canvas
   *
   * @param dataUrl the image url or Data Url
   * @param options object to pass and change some options when loading image, the format of the object is:
   *
   * {
   *   left: <Number: distance from left of canvas>,
   *   top: <Number: distance from top of canvas>,
   *   scale: <Number: initial scale of image>
   * }
   */
  addImg = (dataUrl, options = {}) => {
    let canvas = this._fc;
    fabric.Image.fromURL(dataUrl, (oImg) => {
      let opts = {
        left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
        top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
        scale: 0.5
      };
      Object.assign(opts, options);
      oImg.scale(opts.scale);
      oImg.set({
        'left': opts.left,
        'top': opts.top
      });
      canvas.add(oImg);
    });
  };

  /**
   * Action when an object is added to the canvas
   */
  _onObjectAdded = (e) => {
    let canvas = this._fc;
    if (!this.state.action) {
      this.setState({ action: true });
      return
    }

    if (e.target.id.toString().includes('line') !== true) {

      let obj = e.target;
      this.allPoints? '' : this.allPoints = [] ;
      this.allPoints.push({id: this.activeId, pos: [parseInt(obj.left), parseInt(obj.top)]})

  
      obj.__version = 1;
      // record current object state as json and save as originalState
      let objState = obj.toJSON();
      obj.__originalState = objState;
      let state = JSON.stringify(objState);
      // object, previous state, current state
      this._history.keep([obj, state, state])
      this.updateStates(this.activeId, this.allPoints);
    }
  };

  _drawLine = (posId) => {
    const canvas = this._fc;
    if (posId > 1) {
      const pos2 = this.getElementbyID(posId);
      const pos1 = this.getElementbyID((posId-1));
      let path = [ pos1.left, pos1.top, pos2.left, pos2.top];
      path = path.map((x, index) => index%2? (parseInt(x, 10)-1): (parseInt(x, 10)+2));

      canvas.add(new fabric.Line(path, {
        id: `${this.activeId}-line`,
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
      }))

      canvas.renderAll();
    }
  }

  /**
   * Action when an object is moving around inside the canvas
   */
  _onObjectMoving = (e) => {

  };

  /**
   * Action when an object is scaling inside the canvas
   */
  _onObjectScaling = (e) => {

  };

  /**
   * Action when an object is rotating inside the canvas
   */
  _onObjectRotating = (e) => {

  };

  _onObjectModified = (e) => {
    let obj = e.target;
    // this.updateStates(obj);

    obj.__version += 1;
    let prevState = JSON.stringify(obj.__originalState);
    let objState = obj.toJSON();
    // record current object state as json and update to originalState
    obj.__originalState = objState;
    let currState = JSON.stringify(objState);
    this._history.keep([obj, prevState, currState]);
  };

  /**
   * Action when an object is removed from the canvas
   */
  _onObjectRemoved = (e) => {
    let obj = e.target;
    if (obj.__removed) {
      obj.__version += 1;
      return
    }
    obj.__version = 0;
  };

  /**
   * Action when the mouse button is pressed down
   */
  _onMouseDown = (e, id) => {
    
    if (this.props.tool !== tools.remove.id) {
      // if (this.props.tool !== tools.select.id) {
      if(e.e) this.activeId++;
      else this.activeId = id;
      // }

      // this.updateStates(e.target);
      this._selectedTool.doMouseDown(e, this.activeId);
      this._drawLine(this.activeId);
    } else {
      this.removeSelected();
    }
  };

  /**
   * Action when the mouse cursor is moving around within the canvas
   */
  _onMouseMove = (e) => {
    const canvas = this._fc;
    var pointer = canvas.getPointer(e.e);
    var posx = pointer.x.toFixed(0);
    var posy = pointer.y.toFixed(0);

    // console.log(posx+", "+posy); 
    this._selectedTool.doMouseMove(e);
    this.updateStates(null, null, [posx, posy])
  };

  /**
   * Action when the mouse cursor is moving out from the canvas
   */
  _onMouseOut = (e) => {
    // this.updateStates(e.target);
    this._selectedTool.doMouseOut(e);
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e)
      }, 10)
    }
  };

  _onMouseUp = (e) => {
    // document.getElementById('fileimport').click();
    // console.log(document.getElementById('fileimport'))
   
    // this.updateStates(e.target);
    this._selectedTool.doMouseUp(e);
    // Update the final state to new-generated object
    // Ignore Path object since it would be created after mouseUp
    // Assumed the last object in canvas.getObjects() in the newest object
    if (this.props.tool !== tools.pencil.id) {
      const canvas = this._fc;
      const objects = canvas.getObjects();
      const newObj = objects[objects.length - 1];
      if (newObj && newObj.__version === 1) {
        newObj.__originalState = newObj.toJSON();
      }
    }
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e)
      }, 100)
    }
  };
  
  fileupload = () => {
    let input = document.getElementById('fileupload');
    input.click();
  }

  onDrop = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer? evt.dataTransfer.files : evt.target.files; // FileList object.
    if (files) {
      this.setState({
        imagefile: files[0]
      }, this.addImages(files[0]))
    }
  }

  addImages = (file) => {
    let canvas = this._fc;

    var reader = new FileReader();
    reader.onload = function(f) {
       var data = f.target.result;
       fabric.Image.fromURL(data, function(img) {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              top: 0,
              left:0,
             scaleX: (canvas.width+2) / img.width,
             scaleY: canvas.height / img.height
          });
       });
    };

    reader.readAsDataURL(file);

    // var reader = new FileReader();
    // reader.onload = function (f) {
    //   var data = f.target.result;                    
    //   fabric.Image.fromURL(data, function (img) {
    //     const scales = {
    //       x: (canvas.getWidth() / img.width),
    //       y: (canvas.getHeight() / img.height)
    //     }
    //     console.log(scales, canvas.attributes, canvas.getHeight(),img.width, img.height )
    //     var oImg = img.set({
    //       left: 0, 
    //       top: 0, 
    //       // angle: 0,
    //       // width:300, 
    //       // height:300,
    //       scaleX: scales.x,
    //       scaleY: scales.x,
    //     });
    //     canvas.add(oImg).renderAll();
    //     var a = canvas.setActiveObject(oImg);
    //     var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
    //   });
    // };

    // reader.readAsDataURL(files);
  }

  onDrag = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
 
  /**
   * Track the resize of the window and update our state
   *
   * @param e the resize event
   * @private
   */
  _resize = (e) => {
    if (e) e.preventDefault();
    let { widthCorrection, heightCorrection } = this.props;
    let canvas = this._fc;
    let { offsetWidth, clientHeight } = this._container;
    let prevWidth = canvas.getWidth();
    let prevHeight = canvas.getHeight();
    let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
    let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
    canvas.setWidth(offsetWidth - widthCorrection);
    canvas.setHeight(clientHeight - heightCorrection);
    if (canvas.backgroundImage) {
      // Need to scale background images as well
      let bi = canvas.backgroundImage;
      bi.width = bi.width * wfactor;
      bi.height = bi.height * hfactor
    }
    let objects = canvas.getObjects();
    for (let i in objects) {
      let obj = objects[i];
      let scaleX = obj.scaleX;
      let scaleY = obj.scaleY;
      let left = obj.left;
      let top = obj.top;
      let tempScaleX = scaleX * wfactor;
      let tempScaleY = scaleY * hfactor;
      let tempLeft = left * wfactor;
      let tempTop = top * hfactor;
      obj.scaleX = tempScaleX;
      obj.scaleY = tempScaleY;
      obj.left = tempLeft;
      obj.top = tempTop;
      obj.setCoords()
    }
    this.setState({
      parentWidth: offsetWidth
    });
    canvas.renderAll();
    canvas.calcOffset();
  };

  /**
   * Sets the background color for this sketch
   * @param color in rgba or hex format
   */
  _backgroundColor = (color) => {
    if (!color) return;
    let canvas = this._fc;
    canvas.setBackgroundColor(color, () => canvas.renderAll())
  };

  /**
   * Zoom the drawing by the factor specified
   *
   * The zoom factor is a percentage with regards the original, for example if factor is set to 2
   * it will double the size whereas if it is set to 0.5 it will half the size
   *
   * @param factor the zoom factor
   */
  zoom = (factor) => {
    let canvas = this._fc;
    let objects = canvas.getObjects();
    for (let i in objects) {
      objects[i].scaleX = objects[i].scaleX * factor;
      objects[i].scaleY = objects[i].scaleY * factor;
      objects[i].left = objects[i].left * factor;
      objects[i].top = objects[i].top * factor;
      objects[i].setCoords();
    }
    canvas.renderAll();
    canvas.calcOffset();
  };

  /**
   * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
   */
  undo = () => {
    let history = this._history;
    let [obj, prevState, currState] = history.getCurrent();
    history.undo();
    if (obj.__removed) {
      this.setState({ action: false }, () => {
        this._fc.add(obj);
        obj.__version -= 1;
        obj.__removed = false;
      });
    } else if (obj.__version <= 1) {
      this._fc.remove(obj);
    } else {
      obj.__version -= 1;
      obj.setOptions(JSON.parse(prevState));
      obj.setCoords();
      this._fc.renderAll()
    }
    if (this.props.onChange) {
      this.props.onChange()
    }
  };

  /**
   * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
   */
  redo = () => {
    let history = this._history;
    if (history.canRedo()) {
      let canvas = this._fc;
      //noinspection Eslint
      let [obj, prevState, currState] = history.redo();
      if (obj.__version === 0) {
        this.setState({ action: false }, () => {
          canvas.add(obj);
          obj.__version = 1
        })
      } else {
        obj.__version += 1;
        obj.setOptions(JSON.parse(currState))
      }
      obj.setCoords();
      canvas.renderAll();
      if (this.props.onChange) {
        this.props.onChange()
      }
    }
  };

  /**
   * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can undo otherwise false
   */
  canUndo = () => {
    return this._history.canUndo()
  };

  /**
   * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can redo otherwise false
   */
  canRedo = () => {
    return this._history.canRedo()
  };

  /**
   * Exports canvas element to a dataurl image. Note that when multiplier is used, cropping is scaled appropriately
   *
   * Available Options are
   * <table style="width:100%">
   *
   * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Argument</b></td><td><b>Default</b></td><td><b>Description</b></td></tr>
   * <tr><td>format</td> <td>String</td> <td><optional></td><td>png</td><td>The format of the output image. Either "jpeg" or "png"</td></tr>
   * <tr><td>quality</td><td>Number</td><td><optional></td><td>1</td><td>Quality level (0..1). Only used for jpeg.</td></tr>
   * <tr><td>multiplier</td><td>Number</td><td><optional></td><td>1</td><td>Multiplier to scale by</td></tr>
   * <tr><td>left</td><td>Number</td><td><optional></td><td></td><td>Cropping left offset. Introduced in v1.2.14</td></tr>
   * <tr><td>top</td><td>Number</td><td><optional></td><td></td><td>Cropping top offset. Introduced in v1.2.14</td></tr>
   * <tr><td>width</td><td>Number</td><td><optional></td><td></td><td>Cropping width. Introduced in v1.2.14</td></tr>
   * <tr><td>height</td><td>Number</td><td><optional></td><td></td><td>Cropping height. Introduced in v1.2.14</td></tr>
   *
   * </table>
   *
   * @returns {String} URL containing a representation of the object in the format specified by options.format
   */
  toDataURL = (options) => this._fc.toDataURL(options);

  /**
   * Returns JSON representation of canvas
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string
   */
  toJSON = (propertiesToInclude) => this._fc.toJSON(propertiesToInclude);

  /**
   * Populates canvas with data from the specified JSON.
   *
   * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
   *
   * @param json JSON string or object
   */
  fromJSON = (json) => {
    if (!json) return;
    let canvas = this._fc;
    setTimeout(() => {
      canvas.loadFromJSON(json, () => {
        canvas.renderAll();
        if (this.props.onChange) {
          this.props.onChange()
        }
      })
    }, 100)
  };

  /**
   * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
   * used as needed in order to undo the clear if possible
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string of the canvas just cleared
   */
  clear = (propertiesToInclude) => {
    let discarded = this.toJSON(propertiesToInclude);
    this._fc.clear();
    this._history.clear();
    return discarded
  };

  /**
   * Remove selected object from the canvas
   */
  removeSelected = () => {
    console.log('delete action')
    let canvas = this._fc;
    let activeObj = canvas.getActiveObject();
    if (activeObj) {
      let selected = [];
      if (activeObj.type === 'activeSelection') {
        activeObj.forEachObject(obj => selected.push(obj));
      } else {
        selected.push(activeObj)
      }
      selected.forEach(obj => {
        obj.__removed = true;
        let objState = obj.toJSON();
        obj.__originalState = objState;
        let state = JSON.stringify(objState);
        this._history.keep([obj, state, state]);
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  copy = () => {
    let canvas = this._fc;
    canvas.getActiveObject().clone(cloned => this._clipboard = cloned);
  };

  paste = () => {
    // clone again, so you can do multiple copies.
    this._clipboard.clone(clonedObj => {
      let canvas = this._fc;
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(obj => canvas.add(obj));
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      this._clipboard.top += 10;
      this._clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  };

  /**
   * Sets the background from the dataUrl given
   *
   * @param dataUrl the dataUrl to be used as a background
   * @param options
   */
  setBackgroundFromDataUrl = (dataUrl, options = {}) => {
    let canvas = this._fc;
    if (options.stretched) {
      delete options.stretched;
      Object.assign(options, {
        width: canvas.width,
        height: canvas.height
      })
    }
    if (options.stretchedX) {
      delete options.stretchedX;
      Object.assign(options, {
        width: canvas.width
      })
    }
    if (options.stretchedY) {
      delete options.stretchedY;
      Object.assign(options, {
        height: canvas.height
      })
    }
    let img = new Image();
    img.onload = () => canvas.setBackgroundImage(new fabric.Image(img),
      () => canvas.renderAll(), options);
    img.src = dataUrl
  };

  addText = (text, options = {}) => {
    let canvas = this._fc;
    let iText = new fabric.IText(text, options);
    let opts = {
      left: (canvas.getWidth() - iText.width) * 0.5,
      top: (canvas.getHeight() - iText.height) * 0.5,
    };
    Object.assign(options, opts);
    iText.set({
      'left': options.left,
      'top': options.top
    });

    canvas.add(iText);
  };

  getElementbyID = (id) => {
    return this._fc.getObjects().find(el => el.id === id);
  }

  setElementbyID = (id) => {
    let canvas = this._fc;
    const element = this.getElementbyID(id);
    canvas.setActiveObject(element);
  }

  removeElementbyID = (id) => {
    let canvas = this._fc;
    const element = this.getElementbyID(id);
    canvas.remove(element);
  }

  getSortedElements = () => {
    let canvas = this._fc;
    const elements = canvas.getObjects().sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    const lastIndex = elements.length - 1;
    const lastId = lastIndex >= 0? elements[lastIndex].id : 0;
    return {elements, lastId};
  }

  updateStates = (obj, points, pos) => {

    if (obj || pos) {
      // let canvas = this._fc;
      // const elements = this.getSortedElements();
      // const activeObject = obj;
      const states = {id: obj, elements: points, pos}
  
      if (this.callback && this.initialStates !== states) {
        this.initialStates = states; 
        this.callback(states)
      }
    }
  }

  dataSaveAction = (req) => {
   if (req.length > 0) {
      req.map(point => {
        this._onMouseDown(point.pos, point.id)
      })
    }
  }
  
  intractAction (req, callback) {
    if (!this.callback) this.callback = callback;
    if (req.type ==='del') {

      if (req.id) {
        this.allPoints = this.allPoints.filter(function(item) {
          return item.id !== req.id;
        })

        this.removeElementbyID(req.id)
        this.removeElementbyID(`${req.id}-line`) 
        const lastItemId = this.allPoints.length>0 ? 
            this.allPoints[(this.allPoints.length - 1)].id
          : 
            (()=>{
              this.activeId = 0;
            })();
        this.updateStates(lastItemId, this.allPoints)
      }
      // this.setElementbyID(req.id[1])
    } else if(req.id) {
      this.setElementbyID(req.id);
      // this.updateStates(this.getElementbyID(req.id))
    } else {
      console.log('No ElementId, No DeleteAction');
    }
    // this.updateStates();
  }

  componentDidMount = () => {
    let {
      tool,
      value,
      undoSteps,
      defaultValue,
      backgroundColor
    } = this.props;

    let canvas = this._fc = new fabric.Canvas(this._canvas);

    this.activeId = this.getSortedElements().lastId;
    this._initTools(canvas);

    // set initial backgroundColor
    this._backgroundColor('gainsboro')

    // let selectedTool = this._tools[tool];
    let selectedTool = this._tools['circle'];
    selectedTool.configureCanvas(this.props);
    this._selectedTool = selectedTool;

    // Control resize
    window.addEventListener('resize', this._resize, false);

    // Initialize History, with maximum number of undo steps
    this._history = new History(undoSteps);

    // Events binding
    canvas.on('object:added', this._onObjectAdded);
    canvas.on('object:modified', this._onObjectModified);
    canvas.on('object:removed', this._onObjectRemoved);
    canvas.on('mouse:down', this._onMouseDown);
    canvas.on('mouse:move', this._onMouseMove);
    canvas.on('mouse:up', this._onMouseUp);
    canvas.on('mouse:out', this._onMouseOut);
    canvas.on('object:moving', this._onObjectMoving);
    canvas.on('object:scaling', this._onObjectScaling);
    canvas.on('object:rotating', this._onObjectRotating);

    this.disableTouchScroll();

    this._resize();

    // initialize canvas with controlled value if exists
    (value || defaultValue) && this.fromJSON(value || defaultValue);

  };

  componentWillUnmount = () => window.removeEventListener('resize', this._resize);

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.parentWidth !== prevState.parentWidth
      || this.props.width !== prevProps.width
      || this.props.height !== prevProps.height) {

      this._resize()
    }

    if (this.props.tool !== prevProps.tool) {
      if (this.props.tool !== tools.remove.id) {
        this._selectedTool = this._tools[this.props.tool] || this._tools[tools.pencil.id]
      } else {
        this._selectedTool = this._tools[tools.select.id];
        // return true;
      }
    } 

    //Bring the cursor back to default if it is changed by a tool
    this._fc.defaultCursor = 'default';


    this._selectedTool.configureCanvas(this.props);

    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      this._backgroundColor(this.props.backgroundColor)
    }

    if ((this.props.value !== prevProps.value) || (this.props.value && this.props.forceValue)) {
      this.fromJSON(this.props.value);
    }
  };

  render = () => {
    let {
      className,
      style,
      width,
      height
    } = this.props;

    // let canvasDivStyle = Object.assign({}, style ? style : {},
    //   width ? { width: width } : {},
    //   height ? { height: height } : { height: 512 });
    //   console.log('render function')

    return (
      <div
        className={className}
        ref={(c) => this._container = c}
        // style={canvasDivStyle}
      >  
      <canvas id={uuid4()} className="draw-canvas" ref={(c) => this._canvas = c} style={{border:"3px solid #000"}}></canvas>
      
      { this.state.imagefile ?
       ''
        :
        <div 
          className='empty-area'
          onDragOver = {this.onDrag}
          onDrop = {this.onDrop}  
          onClick= {this.fileupload} 
        >
          <span>No Image</span>
          <input type='file' id='fileupload' onChange={this.onDrop} style={{display:'none'}}/>
        </div>
      }
      </div>
    )
  }
}

SketchField.defaultProps = {
  lineColor: 'black',
  lineWidth: 3,
  fillColor: 'black',
  backgroundColor: 'transparent',
  opacity: 1.0,
  undoSteps: 25,
  tool: tools.pencil.id,
  widthCorrection: 2,
  heightCorrection: 0,
  forceValue: false
}

SketchField.propTypes = {
    // the color of the line
    lineColor: PropTypes.string,
    // The width of the line
    lineWidth: PropTypes.number,
    // the fill color of the shape when applicable
    fillColor: PropTypes.string,
    // the background color of the sketch
    backgroundColor: PropTypes.string,
    // the opacity of the object
    opacity: PropTypes.number,
    // number of undo/redo steps to maintain
    undoSteps: PropTypes.number,
    // The tool to use, can be pencil, rectangle, circle, brush;
    tool: PropTypes.string,
    // image format when calling toDataURL
    imageFormat: PropTypes.string,
    // Sketch data for controlling sketch from
    // outside the component
    value: PropTypes.object,
    // Set to true if you wish to force load the given value, even if it is  the same
    forceValue: PropTypes.bool,
    // Specify some width correction which will be applied on auto resize
    widthCorrection: PropTypes.number,
    // Specify some height correction which will be applied on auto resize
    heightCorrection: PropTypes.number,
    // Specify action on change
    onChange: PropTypes.func,
    // Default initial value
    defaultValue: PropTypes.object,
    // Sketch width
    width: PropTypes.number,
    // Sketch height
    height: PropTypes.number,
    // Class name to pass to container div of canvas
    className: PropTypes.string,
    // Style options to pass to container div of canvas
    style: PropTypes.object,
};

export default SketchField