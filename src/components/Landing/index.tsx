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
        MissionZK is an innovative tool that leverages zero-knowledge proofs and Sismo badges to create a secure and privacy-preserving collaborative prompt chain interface. The key features of this tool are its ability to prove the state of a collaborative prompt chain interface without revealing any sensitive information, as well as its access control mechanism based on Sismo badges.


        </Subtitle>

        {/* <LinkGroup /> */}

        <Text>
          These conferences have accepted to reserve tickets
          <br />
          
        </Text>

        {/* <Search /> */}

        <CallToAction>
          
          {children}
        </CallToAction>
      </Container>
    </>
  );
}
