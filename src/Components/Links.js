import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { COLORS } from "../Styles/Color";
import Logo from "../assets/Logo/logo.png";
import UserIcon from "../assets/icons/user.png";
import CartIcon from "../assets/icons/shoppingCart.png";
import i18next from "../i18next";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SearchBar from "../Containers/SearchBar";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const Links = () => {
  const [language, setLanguage] = useState("en");

  const { t } = useTranslation();

  const isLogged = useSelector((state) => state.isLogged);
  const cart = useSelector((state) => state.cart);

  let handleChange = () => {
    if (language == "en") {
      setLanguage("fr");
      i18next.changeLanguage("fr");
    } else if (language == "fr") {
      setLanguage("en");
      i18next.changeLanguage("en");
    }
  };

  return (
    <Wrapper>
      <LeftSideWrapper>
        <LinkItem to="/">
          <img style={{ height: "5vh", width: "5vw" }} src={Logo}></img>
        </LinkItem>
      </LeftSideWrapper>

      <MiddleWrapper>
        <LinkItem to="/services">{t("Links_services")}</LinkItem>
        <LinkItem to="/shop">{t("Links_shop")}</LinkItem>
        {isLogged ? <LinkItem to="/chat">{t("Links.chat")}</LinkItem> : null}
      </MiddleWrapper>

      <RightSideWrapper>
        <SearchBar />
        <LinkItem to="/cart">
          <img style={{ height: "5vh", width: "5vw" }} src={CartIcon} />
        </LinkItem>
        {isLogged ? (
          <div>
            <LinkItem to="/profile">
              <img style={{ height: "5vh", width: "5vw" }} src={UserIcon} />
            </LinkItem>
          </div>
        ) : (
          <LinkItem to="/auth">{t("Links_signin")}</LinkItem>
        )}
        <LanguageContainer>
          <Select value={language} onChange={handleChange}>
            <MenuItem value="en">
              <i className="fas fa-language"></i>En
            </MenuItem>
            <MenuItem value="fr">
              <i className="fas fa-language"></i>Fr
            </MenuItem>
          </Select>
        </LanguageContainer>
      </RightSideWrapper>
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.username,
    email: state.email,
    isLogged: state.isLogged,
    cart: state.cart,
  };
};

// const mapDispatchToProps = (dispatch) => {//null because we are not planning on changing the state
//   return{

//   }
// };
export default connect(mapStateToProps, null)(Links);

const LinkItem = styled(Link)`
  padding: 0 5%;
  color: white;
  text-decoration: none;
  outline: none;
  &:hover {
    color: ${COLORS.orange};
  }
  font-size: 1.5em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  border: 1px solid black;
  background-color: #242a47;
`;

const LeftSideWrapper = styled.div`
  margin-left: 2%;
`;

const MiddleWrapper = styled.div``;

const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 2%;
`;

const LanguageContainer = styled.div``;
