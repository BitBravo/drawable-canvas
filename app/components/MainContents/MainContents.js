import React from "react";
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import Editor from 'components/Editor';

import './style.scss'

class MainContents extends React.Component {
  constructor(props) {
    super(props);
    this.elements = [],
    this.state = {
      activeObjectId: 0,
      elements: [],
      lastId: 0,
      pos: [0 ,0]
    }
  }

  componentDidMount() {
    this.editor.intractAction(false, this.updateState);
  }

  componentWillMount() {

  }

  dataSaveAction = (e) => {
    if (e === 'save') {
      this.props.onSaveContents(this.elements)
    } else {
      this.editor.dataSaveAction(JSON.parse(this.resultElements.innerText)); 
    }
    // this.elementId.props= 4;
    // const actionType = e.target.getAttribute('name');
    // console.log('Data save ===>', actionType)
    // this.setState({temp: this.state})
    // this.temp.cObject.id++;
    // console.log(this.temp)
  }

  intractAction = (e) => {
    let { activeObjectId, elements, lastId } = this.state;
    let currentIndex = this.elements.findIndex(element => element.id === activeObjectId)

    if (e === 'inc') {
      currentIndex = currentIndex + 1;
    } else if (e==='dec') {
      currentIndex = currentIndex - 1;
    } else {
      this.editor.intractAction({id: activeObjectId, type: e}, this.updateState); 
    }
    this.elements[currentIndex]? this.setState({activeObjectId: this.elements[currentIndex].id}) : '';
  }

  updateState = (states) => {
    states.id? this.setState({activeObjectId: states.id}): '';
    states.pos? this.setState({pos: states.pos}): '';
    if (states.elements) { this.elements = states.elements }
  }


  render() {
    const { activeObjectId, elements, pos } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Car Detection Map</h5>
                      <CardTitle tag="h2">Detection View</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div style={{height:"500px", backgroundColor:'#27293d'}} className="editor-area">
                    <Editor 
                      contents={this.props.contents}
                      ref={(editor) => { this.editor = editor; }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    {/* <Col className="" sm="4">
                      <CardTitle tag="h2">Result</CardTitle>
                    </Col>
                    {/* <button>fwefwef</button>
                    <button>fwefwef</button> */}
                    <Col sm="7">
                      <ButtonGroup
                        className="btn-group-toggle float-right preview-action-bar"
                        data-toggle="buttons"
                      > 
                        <Button
                          className={"btn-simple"}
                          color="info"
                          id="0"
                          size="sm"
                          name="save" 
                          onClick={e => this.dataSaveAction('save')}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block" name="save">
                            Save
                          </span>
                        </Button>
                  
                        <Button
                          color="info"
                          className={"btn-simple"}
                          id="1"
                          size="sm"
                          name="load"
                          onClick={e => this.dataSaveAction('load')}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block" name="download">
                            Load
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div 
                    style={{height:"500px", backgroundColor:'#27293d'}} 
                    className="result-view" contentEditable 
                    suppressContentEditableWarning={true}
                    contentEditable
                    ref={(input) => { this.resultElements = input; }}
                  >
                  {JSON.stringify(this.elements)}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="card-chart main-control-board">
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Incremental ID: </label>
                        <Input
                          placeholder="0"
                          type="text"
                          value={activeObjectId}
                          ref={(input) => { this.elementId = input; }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Coordinate:</label>
                        <Input
                          placeholder="X => 0, Y=> 0"
                          type="text"
                          value={`X => ${pos[0]}, Y => ${pos[1]}`}
                          ref={(input) => { this.elementPos = input; }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit" onClick={e => this.intractAction('inc')}>
                          Increase
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit" onClick={e => this.intractAction('dec')}>
                          Decrease
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit" onClick={e => this.intractAction('del')}>
                          Delete
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MainContents;
