import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import {
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";


const useStyles = makeStyles((theme)=>({
    root:{

    },
    framefooter:{
        marginTop:'auto',
        padding: '80px 60px',
        background: 'white',
        // position: '',
        bottom: '0',
        width: '100%',

    }

}));

function Footer () {
    const classes = useStyles();

return (

   
	<Box className={classes.framefooter}>
        <h1 style={{ color: "black",
                    textAlign: "center",
                    marginTop: "-50px" }}>
           Tiki - Thật nhanh, thật chất lượng, thật rẻ
        </h1>
        <Container>
            <Row>
            <Column>
                <Heading>Hỗ trợ khách hàng</Heading>
                <FooterLink href="#">Các câu hỏi thường gặp</FooterLink>
                <FooterLink href="#">Gửi yêu cầu hỗ trợ</FooterLink>
                <FooterLink href="#">Hướng dẫn đặt hàng</FooterLink>
            </Column>
            <Column>
                <Heading>Về Tiki</Heading>
                <FooterLink href="#">Giới thiệu Tiki</FooterLink>
                <FooterLink href="#">Tuyển dụng</FooterLink>
                <FooterLink href="#">Chính sách bảo mật thanh toán</FooterLink>
                <FooterLink href="#">Chính sách bảo mật thông tin cá nhân</FooterLink>
            </Column>
            <Column>
                <Heading>Hợp tác và liên kết</Heading>
                <FooterLink href="#">Quy chế hoạt động sàn GDTMĐT</FooterLink>
                <FooterLink href="#">Bán hàng cùng Tiki</FooterLink>
                <FooterLink href="#">Indore</FooterLink>
                <FooterLink href="#">Mumbai</FooterLink>
            </Column>
            <Column>
                <Heading>Kết nối với chúng tôi</Heading>
                <FooterLink href="#">
                <i className="fab fa-facebook-f">
                    <span style={{ marginLeft: "10px" }}>
                    Facebook
                    </span>
                </i>
                </FooterLink>
                <FooterLink href="#">
                <i className="fab fa-instagram">
                    <span style={{ marginLeft: "10px" }}>
                    Instagram
                    </span>
                </i>
                </FooterLink>
                <FooterLink href="#">
                <i className="fab fa-twitter">
                    <span style={{ marginLeft: "10px" }}>
                    Twitter
                    </span>
                </i>
                </FooterLink>
                <FooterLink href="#">
                <i className="fab fa-youtube">
                    <span style={{ marginLeft: "10px" }}>
                    Youtube
                    </span>
                </i>
                </FooterLink>
            </Column>
            </Row>
        </Container>
	</Box>

);
};
export default Footer;
