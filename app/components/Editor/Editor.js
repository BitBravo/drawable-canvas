import React from 'react'
import 'fabric-webpack'
import { SketchField, Tools } from './Elements'

import './style.scss';

class Editor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      lineWidth: 10,
      lineColor: 'black',
      fillColor: '#68CCCA',
      backgroundColor: 'transparent',
      shadowWidth: 0,
      shadowOffset: 0,
      tool: Tools.Pencil,
      enableRemoveSelected: false,
      fillWithColor: false,
      fillWithBackgroundColor: false,
      drawings: [],
      canUndo: false,
      canRedo: false,
      controlledSize: false,
      sketchWidth: 600,
      sketchHeight: 600,
      stretched: true,
      stretchedX: false,
      stretchedY: false,
      originX: 'left',
      originY: 'top',
      imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
      expandTools: false,
      expandControls: false,
      expandColors: false,
      expandBack: false,
      expandImages: false,
      expandControlled: false,
      text: 'a text, cool!',
      enableCopyPaste: false,
    };
  }

   render() {
    return (
      <SketchField
        name="sketch"
        className="canvas-area"
        ref={c => (this._sketch = c)}
        // lineColor={this.state.lineColor}
        // lineWidth={this.state.lineWidth}
        // fillColor={
        //   this.state.fillWithColor
        //     ? this.state.fillColor
        //     : 'transparent'
        // }
        // backgroundColor={
        //   this.state.fillWithBackgroundColor
        //     ? this.state.backgroundColor
        //     : 'transparent'
        // }
        width={
          this.state.controlledSize ? this.state.sketchWidth : null
        }
        height={
          this.state.controlledSize ? this.state.sketchHeight : null
        }
        // defaultValue={dataJson}
        // value={controlledValue}
        // forceValue
        // onChange={this._onSketchChange}
        tool={this.state.tool}
      />
    )
  }
}

export default Editor;
