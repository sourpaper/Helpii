import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dateFormat from "dateformat";
import { COLORS } from "../Styles/Color";
import axios from "axios";
import Card from "../Components/Card";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../Actions";
import { useHistory } from "react-router-dom";

const ServiceItem = (props) => {
  const history = useHistory();

  const [service, setService] = useState([]);
  // const [isCartItem, setCartItem] = useState(false);
  let getCartItems = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("test");
    //use axios call to get the item
    axios
      .get(
        "https://helpii-backend.herokuapp.com/services/" + props.match.params.id
      )
      .then((results) => {
        // console.log("test");
        console.log(results.data[0]);
        setService(results.data[0]);
        console.log(service);
      })
      .catch();

    //get user information
  }, []);

  let handleCartItem = () => {
    // setCartItem(!isCartItem);

    // verify if it contains the items in carts

    let isContain = false;

    for (let i = 0; i < getCartItems.length; i++) {
      if (getCartItems[i].id == service.id) {
        isContain = true;
        return;
      }
    }

    // if true add to redux cart
    if (!isContain) {
      console.log(getCartItems);
      getCartItems.push(service);
      dispatch(setCart(getCartItems));
    }

    history.push("/cart/");
  };

  return (
    <Wrapper>
      <UpperWrapper>
        <MainContainer>
          <ActionButton>
            <Button onClick={handleCartItem}>
              <i class="fas fa-cart-plus"></i>add to Cart
            </Button>
          </ActionButton>
          <TitleContainer>
            <Title>{service.title}</Title>
            <Date>{dateFormat(service.date, "dddd, mmmm dS, yyyy")}</Date>
          </TitleContainer>
          <p>{service.description}</p>
        </MainContainer>
        <UserContainer>
          <Username>service.username</Username>
          <p>Email: john@gmail.com</p>
        </UserContainer>
      </UpperWrapper>
      <CommentSection>
        <SubTitle>Comment</SubTitle>
      </CommentSection>
    </Wrapper>
  );
};

export default ServiceItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  border: 1px solid black;
  width: 20%;
  margin: 4%;
  padding: 1%;
`;

const MainContainer = styled.div`
  padding: 4%;
  background: rgba(190, 190, 190, 0.4);
  width: 70%;
  margin: 10%;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 2em;
`;

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 1.5em;
`;

const Username = styled.div`
  font-weight: 400;
  font-size: 1.5em;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Date = styled.div``;

const ActionButton = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CommentSection = styled.div`
  text-align: left;
  margin: 0 4%;
  border-bottom: 1px solid black;
`;

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
