import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const fabric = window.fabric

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 600,
    height: 400,
  }

  state = {
    canvas: null,
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    const canvasObject = new fabric.Ellipse({
        left: 10,
        top: 10,
        fill: "rgba(255, 255, 255, 0)",
        originX: "center",
        originY: "center",
        // rx: Math.abs(10 - mouseTo.x),
        // ry: Math.abs(1 - mouseTo.y),
        // strokeWidth: drawWidth
      });
    canvas.add(canvasObject);
    this.setState({ canvas })
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })
    // console.log(children)
    const { width, height } = this.props
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.state.canvas && children}
        {/* <button onClick={e => {
          e.preventDefault()
          console.log(this.state.canvas.toJSON())
        }}>To JSON</button> */}
      </Fragment>
    )
  }
}

export default DesignCanvas
