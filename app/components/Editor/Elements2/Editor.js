import React from 'react'
import 'fabric-webpack'

import DesignCanvas from './DesignCanvas'
import Rect from './Rect'
import Circle from './Circle'
import Image from './Image'

import './style.scss';

class Editor extends React.Component { // eslint-disable-line react/prefer-stateless-function
   render() {
    return (
      <DesignCanvas>
        <Rect width={100} height={100} fill="red" />
        {/* <Circle radius={20} top={200} />
        <Image url="https://http.cat/100" scale={0.2} top={100} />
        <Rect width={100} height={100} fill="blue" />
        <Circle radius={20} top={200} />
        <Image url="https://http.cat/100" scale={0.2} top={100} />
        <Rect width={100} height={100} fill="blue" />
        <Circle radius={20} top={200} />
        <Image url="https://http.cat/100" scale={0.2} top={100} /> */}
      </DesignCanvas>
    )
  }
}

export default Editor;
