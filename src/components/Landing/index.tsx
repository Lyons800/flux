import styled from "styled-components";
import LinkGroup from "../LinkGroup";
import Search from "../Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.regular};
  margin: 50px;

  @media (max-width: 800px) {
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-family: ${props => props.theme.fonts.mont};
  font-size: 50px;
  line-height: 60px;
  width: 654px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    font-size: 40px;
    line-height: 48px;
    width: 100%;
  }
`;

const Subtitle = styled.div`
font-family: ${props => props.theme.fonts.light};
  font-size: 18px;
  line-height: 24px;
  color: ${props => props.theme.colors.blue10};
  width: 654px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    font-size: 16px;
    margin-bottom: 40px;
    width: 100%;
  }
`;

const Text = styled.div`
  font-family: ${props => props.theme.fonts.light};
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.theme.colors.blue10};
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 800px) {
    margin-bottom: 40px;
  }
`;

const CallToAction = styled.div`
font-family: ${props => props.theme.fonts.light};

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;


type Props = {
  children: React.ReactNode;
};

export default function Landing({ children }: Props): JSX.Element {

  return (
    <>
      <Container>
        <Title>MissionZK</Title>

        <Subtitle>
        MissionZK focuses on improving the decision-making process within DAOs by leveraging zk-badgers from Sismo for identity verification. DAOs often struggle with effective decision-making, as they can be prone to manipulation and lack of transparency. By using Sismo badges, the platform verifies the identity of DAO contributors and ensures they meet specific criteria, such as having a Twitter account older than 30 days or owning a GitHub repository. This Sybil resistance layer fosters a trusted environment for contributors to express their pros and cons on various DAO proposals, ensuring that only genuine opinions from verified members are considered. This enhances the overall decision-making process within DAOs, promoting trust, transparency, and more informed choices.

        </Subtitle>

        {/* <LinkGroup /> */}

      
        {/* <Search /> */}

        <CallToAction>
          
          {children}
        </CallToAction>
      </Container>
    </>
  );
}
