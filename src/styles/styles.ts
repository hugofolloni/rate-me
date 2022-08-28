import styled from "styled-components";

export const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    width: 100vw;
    height: 80px;
    background-color: #56203D; 
`;

export const Input = styled.input`
    width: 280px;
    height: 40px;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 15px;
    color: #333;
    background-color: #fff;
    outline: none;
`;

export const Title = styled.h1`
    font-size: 54px;
    color: #fff;
    font-weight: bold;
    margin: 0;
    letter-spacing: -5px;
`;

export const LinkButton = styled.a`
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid white;

    &:hover {
        background-color: #56203D;
        color: #fff;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 350px;
    height: 70px;
`;

export const UserInfoP = styled.p`
    font-size: 15px;
    color: #fff;
    font-weight: bold;
    margin: 0; 
`;

export const HomepageDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #fff;
    position: relative;
`;

export const CartImage = styled.img`
    width: 320px;
    height: 320px;
    transition: transform 0.5s;
    position: absolute;
    top: 0;
    right: 0;
    margin: -10px 70px;
    &:hover {
        transform: scale(1.1);
    }
`;

export const FirstPartHomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 50vw;
    height: 60%;
    padding: 60px 100px;
`;

export const FirstPartHomeH1 = styled.h1`
    font-size: 54px;
    color: black;
    font-weight: 400;
    margin: 0;
    letter-spacing: -5px;
`;

export const FirstPartHomeP = styled.p`
    font-size: 15px;
    color: black;
    font-weight: 500;
    margin: 0;
`;

export const FirstParteHomeSearch = styled.input`
    width: 280px;
    height: 40px;
    border: 2px solid #56203D;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 15px;
    color: #56203D;
    background-color: #fff;
    outline: none;
    margin-top: 15px;
`;

export const SecondPartHomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 40px 60px;
    width: 100vw;
    height: 40%;
    background-color: #483A58;
`

export const SecondPartHomeCategories = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const SecondPartHomeCategoriesP = styled.p`
    font-size: 24px;
    color: #fff;
    font-weight: 500;
    margin: 0;
`;

export const SecondPartHomeCategoriesLink = styled.a`
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-color: #56638A;
    color: #fff;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
    border: 3px solid #eee;
    font-weight: 600;

    &:hover {
        background-color: #fff;
        color: #56638A;
    }
`;

export const SingleProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 250px;
    height: 350px;
    border-radius: 12px;
    border: 3px solid #56203D;
    background-color: #fff;
    padding: 20px;
    margin: 20px;
`;

export const SingleProductImageDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    overflow: hidden;
`;

export const SingleProductImg = styled.img`
    max-width: 90%; 
    max-height: 100%;
    border-radius: 12px;
`

export const ProductListDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100vw;
    padding: 5vw;
    flex-wrap: wrap;

`

export const SearchPageDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100vw;
    height: calc(100vh - 80px);
    background-color: #fff;
    position: relative;
`;

export const SearchProductLink = styled.a`
    width: 80px;
    height: 40px;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #56203D;
    color: #fff;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #fff;
        color: #56203D;
    }
`;

export const QueryDisplay = styled.h1`
    font-size: 32px;
    color: black;
    font-weight: 600;
    margin: 40px 40px -40px 5vw;
`;

export const SingleItemTitle = styled.h1`
    font-size: 18px;
    color: #56203D;
    font-weight: 600;
    margin: 0;
    letter-spacing: -1px;
`;

export const SingleItemRate = styled.p`
    font-size: 15px;
    color: #56203D;
    font-weight: 500;
    margin: 0;
`;

export const AddItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    padding: 4vw;
    margin-top: -1vw;
    height: calc(100vh - 80px);
`;

export const StarDiv = styled.div`
    width: 25px;
    height: 25px;
    border: 1px solid white;
    cursor: pointer;
`
export const CategorySelector = styled.div`
    display: flex;
    flex-direction: row;
    width: 120px;
    border: 2px solid #aaaaaa;
    border-radius: 5px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const AddItemTitle = styled(QueryDisplay)`
    margin: 0;
    `;

export const CategorySelectorDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 85vw;
    justify-content: space-around;
    align-items: center;
    margin-left: -10px;
`

export const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 80px;
`

export const FormItemLabel = styled.p`
    font-size: 18px;
    color: #56203D;
    font-weight: 500;
    margin: 0;
    margin-left: 10px;
`

export const FormItemInput = styled.input`
    width: 280px;
    height: 40px;
    border: 2px solid #56203D;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 15px;
    color: #56203D;
    background-color: #fff;
    outline: none;

    &:focus {
        border: 3px solid #56203D;
    }
`;

export const FormButton = styled.button`
    width: 120px;
    height: 40px;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #56203D;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    margin-top: 20px;
    transition: 0.3s;
    cursor: pointer;
    
    &:hover {
        background-color: #fff;
        color: #56203D;
    }
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    height: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;

    `

export const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 4vw;
    margin-top: -1vw;
    height: calc(100vh - 80px);
    position: relative;
`

export const LoginTitle = styled(QueryDisplay)`
    margin: 0;
`;

export const CreateAccountLink = styled.a`
    color: #56203D;
`
export const LoginImages = styled(CartImage)`
    margin-top: 140px;
    `

export const ProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 70px);
    position: relative;
    background-color: #56203D;
    margin-top: -10px;
`

export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 90%;
    padding: 4vw;
    margin-top: -1vw;
    height: calc(100vh - 130px);
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    background-color: #fff;
`

export const ProductTitle = styled(QueryDisplay)`
    margin: 0;
    margin-top: 20px;
`

export const ProductImage = styled.img`
    max-width: 400px;
    max-height: 400px;
    position: absolute;
    top: 0;
    right: 0;
    margin: calc(30% - 200px) 30px;
    transition: 0.3s;

    &:hover {
        transform: scale(1.1);
    }
`

export const ProductRate = styled.p`
    font-size: 32px;
    color: #56203D;
    font-weight: 500;
    position: absolute;
    top: 0;
    right: 0;
    margin: 50px 100px;
    `

export const ReviewDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
`

export const StarsDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
`

export const CommentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: #56203D;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    border-radius: 5px;
    overflow: scroll;
    overflow-x: hidden;
    height: 350px;
`

export const SingleComment = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
`

export const CommentTitle = styled.h1`
    font-size: 18px;
    color: #56203D;
    font-weight: 600;
    margin: 0;
    margin-left: 10px;
`

export const CommentText = styled.p`
    font-size: 15px;
    color: #111;
    font-weight: 400;
    margin: 0;
`

export const AddCommentButton =  styled.button`
    width: 180px;
    height: 50px;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #56203D;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: #56203D;
    }
`;

export const TranslucentBackground = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    margin-left: -5vw;
    height: calc(100vh - 93px);
    background-color: rgba(0,0,0,0.5);
`

export const AddCommentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 60%;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    margin-left: 20vw;
    margin-top: 15vh;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5)
`

export const AddCommentTitle = styled(QueryDisplay)`
    margin: 5px 5%;
`

export const AddCommentText = styled.textarea`
    width: 90%;
    height: 50%;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
    margin: 5px 5%;
    resize: none;
`

export const AddInsideCommentButton = styled.button`
    width: 180px;
    height: 50px;
    border: 2px solid #56203D;
    border-radius: 5px;
    background-color: #56203D;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    transition: 0.3s;
    cursor: pointer;
    margin-left: 68.5%;

    &:hover {
        background-color: #fff;
        color: #56203D;
    }
`;


