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
    this.state = {
      activeObject: {},
      elements: [],
      lastId: 0,
    }
  }

  componentDidMount() {
    this.editor.intractAction(false, this.updateState);
  }

  componentWillMount() {
    // console.log('fwefwfwfwfwfwe')
  }

  dataSaveAction = (e) => {
    console.log(this.elementId)
    this.elementId.props= 4;
    // const actionType = e.target.getAttribute('name');
    // console.log('Data save ===>', actionType)
    // this.setState({temp: this.state})
    // this.temp.cObject.id++;
    // console.log(this.temp)
  }

  intractAction = (e) => {
    let { activeObject, elements, lastId } = this.state;

    const currentIndex = elements.indexOf(activeObject);
    if (0 < currentIndex< elements.length) {
      let nextElementId = 0
        
      if (e ==='inc')       nextElementId = elements[(currentIndex+1)]? elements[(currentIndex+1)].id : elements[(currentIndex)].id;
      else if (e ==='dec')  nextElementId = elements[(currentIndex-1)]? elements[(currentIndex-1)].id : 0;
      else                  nextElementId = [activeObject.id, (elements[(currentIndex-1)]? elements[(currentIndex-1)].id : 0)];

      console.log('CurrentId, NextItem Id, Elements ===> ', activeObject.id, nextElementId, elements)
      this.editor.intractAction({id: nextElementId, type: e}, this.updateState); 
    } else {
      this.props.createNotification('error', 'No elements');
    }
  }

  updateState = (states) => {
    console.log('STATES UPDATED ===>', states);
    this.setState({...states})
  }


  render() {
    const { activeObject, elements } = this.state;
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
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Result</CardTitle>
                    </Col>
                    <Col sm="6">
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
                          onClick={this.dataSaveAction}
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
                          name="download"
                          onClick={this.dataSaveAction}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block" name="download">
                            Download
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div style={{height:"500px", backgroundColor:'#27293d'}} className="result-view" contentEditable>
                  {"JSON.stringify(elements)"}
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
                          defaultValue={activeObject.id}
                          ref={(input) => { this.elementId = input; }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Coordinate:</label>
                        <Input
                          placeholder="X => 0, Y=> 0"
                          type="text"
                          defaultValue={`X => ${activeObject.x1 || 0}, Y=> ${activeObject.y1 || 0}`}
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
