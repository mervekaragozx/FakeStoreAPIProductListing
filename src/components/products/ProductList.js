import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
  CardText,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  addToCart = (product) => {
    this.props.actions.addToCart({ quantity: 1, product });
    alertify.success(product.title + " added to cart.");
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">All Products</Badge>/
          <Badge color="success">{this.props.currentCategory}</Badge>
          <Badge color="info">{this.props.currentCategory.length||this.props.products.length} products</Badge>
        </h3>
        <Row lg={3}>
          {this.props.products.map((product) => (
            <Col key={product.id} className="d-flex">
              <Card
                className="flex-fill"
                style={{
                  width: "18rem",
                }}
              >
                <img alt="Sample" src={product.image} />
                <CardBody>
                  <CardTitle tag="h3">{product.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h5">
                    category: {product.category}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {product.description}
                  </CardSubtitle>
                  <CardText>{product.price}$</CardText>
                  <Button
                    color="danger"
                    onClick={() => this.addToCart(product)}
                  >
                    Add to cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
