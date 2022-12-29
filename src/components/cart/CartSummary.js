import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class CartSummary extends Component {
  renderEmpty() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <h4>Shopping Cart</h4>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>Your cart is empty.</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderSummary() {
    let totalPrice = 0;
    this.props.cart.forEach((cartItem) => {
      totalPrice += cartItem.product.price * cartItem.quantity;
    });
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <h4>Shopping Cart</h4>
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="secondary"
                onClick={() =>
                  this.props.actions.decrementQuantity(cartItem.product)
                }
              >
                -
              </Badge>
              <Badge color="success">{cartItem.quantity}</Badge>
              <Badge
                color="secondary"
                onClick={() =>
                  this.props.actions.incrementQuantity(cartItem.product)
                }
              >
                +
              </Badge>
              {cartItem.product.title}
              <Badge
                color="danger"
                onClick={() =>
                  this.props.actions.removeFromCart(cartItem.product)
                }
              >
                -
              </Badge>
            </DropdownItem> //ürünlerin dropdownda gösterilmesi
          ))}
          <DropdownItem divider />
          <DropdownItem>
            {"Total: " + totalPrice.toFixed(2) + " $"}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      incrementQuantity: bindActionCreators(
        cartActions.incrementQuantity,
        dispatch
      ),
      decrementQuantity: bindActionCreators(
        cartActions.decrementQuantity,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
