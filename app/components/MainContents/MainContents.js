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
  render() {
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
                  <div style={{height:"500px", backgroundColor:'#27293d'}}>
                    <Editor />
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
                          tag="label"
                          className={"btn-simple"}
                          color="info"
                          id="0"
                          size="sm"
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Save
                          </span>
                        </Button>
                  
                        <Button
                          color="info"
                          className={"btn-simple"}
                          id="1"
                          size="sm"
                          tag="label"
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div style={{height:"500px", backgroundColor:'#27293d'}}>
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
                          defaultValue="0"
                          placeholder="0"
                          type="text"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Coordinate:</label>
                        <Input
                          defaultValue="X => 0, Y=> 0"
                          placeholder="X => 0, Y=> 0"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit">
                          Increase
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit">
                          Decrease
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit">
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
