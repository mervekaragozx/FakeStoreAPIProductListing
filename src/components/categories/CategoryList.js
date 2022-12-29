import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories(); //bunu yaptığımız anda uyg. açıldığı anda categori state'i değişiyor.
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category);
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup vertical>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category === this.props.currentCategory}
              onClick={() => this.selectCategory(category)}
              key={category}
            > 
              {category}
            </ListGroupItem>
          ))}
        </ListGroup>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
