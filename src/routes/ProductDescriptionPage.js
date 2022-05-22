import { throwServerError } from "@apollo/client";
import { Parser } from "graphql/language/parser";
import React from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component params={useParams()} {...props} />;
}

class ProductDescriptionPage extends React.Component {
  product = this.props.products.find(
    (product) => product.id === this.props.params.id
  );
  productImage = this.product.gallery[0];

  // checks, wheither product has attributes, and renders them
  showAttributesIfpresent() {
    if (this.product.attributes.length > 0) {
      const attributes = this.product.attributes;
      console.log(attributes);
      return attributes.map((item) => {
        if (item.type === "text") {
          return (
            <>
              <span className="product-page-size-title">{item.name}:</span>
              <div className="product-page-size">
                {item.items.map((item) => {
                  return (
                    <button className="size-attribute" key={item.id}>
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </>
          );
        } else if (item.type === "swatch") {
          return (
            <>
              <span className="product-page-color-title">{item.name}:</span>
              <div className="product-page-color">
                {item.items.map((item) => {
                  return (
                    <button
                      key={item.id}
                      className="color-attribute"
                      style={{ backgroundColor: `${item.value}` }}
                    />
                  );
                })}
              </div>
            </>
          );
        }
      });
    }
  }

  // choosing product image from the gallery on left side of the page
  chooseProductImage(e) {
    const img = document.querySelector(".product-page-img");
    img.src = e.target.src;
  }

  render() {
    return (
      <section
        className="product-page-content"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        <aside className="product-page-gallery">
          {this.product.gallery.map((img) => {
            return (
              <img
                key={img}
                src={img}
                width="88px"
                alt="product gallery"
                className="product-page-gallery-item"
                onClick={(e) => this.chooseProductImage(e)}
              />
            );
          })}
        </aside>
        <main className="product-page-description-container">
          <div className="product-page-img-wrapper">
            <img
              src={this.productImage}
              alt="product"
              className="product-page-img"
            />
          </div>
          <div className="product-page-description">
            <span className="product-page-brand"> {this.product.brand}</span>
            <br />
            <span className="product-page-name"> {this.product.name} </span>
            <div className="product-page-attributes">
              {this.showAttributesIfpresent()}
              <span className="product-page-price-title"> Price </span> <br />
              <span className="product-page-price">
                {this.props.currency}
                {
                  this.product.prices.find(
                    (item) => item.currency.symbol === this.props.currency
                  ).amount
                }
              </span>
              <br />
              <button className="product-page-add-to-card">add to card</button>
              <p className="product-page-description-text">{}</p>
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default withParams(ProductDescriptionPage);
