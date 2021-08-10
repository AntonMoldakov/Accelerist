import moment from 'moment';
import Link from 'next/link';
import { UserIcon } from 'public/icons/components';
import { IProspect } from 'services/types';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const Prospect = ({ prospect }: ProspectProps) => {
  const date = moment(prospect.updatedAt).format('DD MMM YY');

  return (
    <Root>
      <Header>
        <Link href={'/prospects/' + prospect.id}>
          <Title>{prospect.name ? prospect.name : 'No Name'}</Title>
        </Link>
      </Header>
      <Section>
        <SectionTitle>Filters</SectionTitle>
        <Ul>
          <Li>Gender: {prospect.filters.gender}</Li>
          {prospect.filters.location &&
            prospect.filters.location.length > 0 &&
            prospect.filters.location.map((item, index) => <Li key={item + index}>{item}</Li>)}
          {prospect.filters.industry &&
            prospect.filters.industry.length > 0 &&
            prospect.filters.industry.map((item, index) => <Li key={item + index}>{item}</Li>)}
          {prospect.filters.variantForm && <Li>{prospect.filters.variantForm}</Li>}
        </Ul>
      </Section>
      <Main>
        <MainWrapper>
          <SectionTitle>№ of Prospects Available</SectionTitle>
          <MainText>{prospect.prospectsAvailable}</MainText>
        </MainWrapper>
      </Main>
      <Footer>
        <UserBlock>
          <AvatarContainer $src={prospect.lastAuthor.avatarKey}>
            {!prospect.lastAuthor.avatarKey && <UserIcon height={20} width={20} />}
          </AvatarContainer>

          <div>
            <UserName>
              {prospect.lastAuthor.firstName || prospect.lastAuthor.lastName
                ? (prospect.lastAuthor.firstName || '') + (prospect.lastAuthor.lastName || '')
                : 'No name'}
            </UserName>
            <SectionTitle>Owner</SectionTitle>
          </div>
        </UserBlock>
        <DateBlock>
          <SectionTitle>Last Activity</SectionTitle>
          <FooterText>{date}</FooterText>
        </DateBlock>
      </Footer>
    </Root>
  );
};

export default Prospect;

interface ProspectProps {
  prospect: IProspect;
}

interface AvatarProps {
  $src: string | null;
}

const Root = styled.section`
  width: 536px;
  background: ${colors.white};
  border-radius: 6px;
  margin: 12px;
  padding: 24px;
`;

const Header = styled.header`
  padding-bottom: 9px;
  border-bottom: 1px solid ${colors.gray};
  margin-bottom: 16px;
`;

const SectionTitle = styled.p`
  font-size: 12px;
  line-height: 150%;
  color: ${colors.darkGray};
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  cursor: pointer;
  color: ${colors.black};
`;

const Ul = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0px 4px;
  list-style: none;
`;

const Li = styled.li`
  border: 1px solid ${colors.lightBlue2};
  box-sizing: border-box;
  border-radius: 6px;
  background: ${colors.white};
  font-size: 12px;
  line-height: 150%;
  color: ${colors.black};
  padding: 6px 10px;
  margin-right: 8px;
`;

const Main = styled.main`
  margin-bottom: 24px;
`;

const MainText = styled.p`
  color: ${colors.black};
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.black};
  margin-bottom: 4px;
`;

const FooterText = styled.p`
  font-size: 12px;
  line-height: 150%;
  color: ${colors.black};
  margin-bottom: 4px;
`;

const MainWrapper = styled.div`
  width: 100%;
  background: ${colors.lightGray3};
  border-radius: 4px;
  height: 71px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AvatarContainer = styled.div<AvatarProps>`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background: ${({ $src }) => ($src ? `url(${$src})` : colors.lightBlue3)};
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const UserBlock = styled.div`
  display: flex;
  justify-content: center;
`;
