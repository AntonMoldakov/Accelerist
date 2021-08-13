import { CompanyAvatarIcon, HeartIcon } from 'public/icons/components';
import React from 'react';
import Link from 'next/link';
import { ICompany } from 'services/types';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Button, IconButton } from 'ui';
import { useRouter } from 'next/dist/client/router';
import regulars from 'utils/regulars';
import { dislikeCompany, likeCompany } from 'store/companies/action';
import { useAppDispatch } from 'store';
import { toastr } from 'react-redux-toastr';

const Company = ({ company }: FavoriteCompanyProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const matcher = (str: string, reg: RegExp) => {
    return str.match(reg) || [];
  };

  const revenue =
    company.revenue.length < 4
      ? company.revenue
      : matcher(company.revenue.split('').reverse().join(''), regulars.sum).join(',').split('').reverse().join('');

  const handleFavorite = () => {
    if (company.like) {
      dispatch(dislikeCompany(company.id));
      toastr.success('Well Done', 'Company successfully like');
    } else {
      dispatch(likeCompany(company.id));
      toastr.success('Well Done', 'Company successfully dislike');
    }
  };

  return (
    <Section>
      <CompanyAvatarContainer>
        <CompanyAvatarWrapper>
          {!company.logo ? <CompanyAvatarIcon width={48} height={48} /> : <CompanyAvatar $src={company.logo} />}
        </CompanyAvatarWrapper>
        <CompanyAvatarFooter>
          <P>Priority Ranking</P>
          <p>4</p>
        </CompanyAvatarFooter>
      </CompanyAvatarContainer>
      <CompanyWrapper>
        <CompanyMain>
          <Link href={'/company/' + company.id}>
            <A>{company.name}</A>
          </Link>
          <P>
            {company.street + ' ' + company.city + ' ' + company.state + ' ' + company.country + ' ' + company.zipCode}
          </P>
          <P>{company.phone ? company.phone : ''}</P>
        </CompanyMain>
        <CompanyFooter>
          <FooterItemFirst>
            <P>CSR Focus</P>
            <div>
              <p>No Information</p>
            </div>
          </FooterItemFirst>
          <FooterItemSecond>
            <P>Revenue</P>
            <div>
              <p>{'$ ' + revenue}</p>
            </div>
          </FooterItemSecond>
        </CompanyFooter>

        <ButtonContainer>
          <IconButton
            onClick={() => handleFavorite()}
            theme="secondary"
            Icon={<HeartIcon width={20} height={20} fill={company.like ? colors.red : ''} />}
          />
          <Button onClick={() => router.push('/company/' + company.id)} theme="third">
            Profile
          </Button>
        </ButtonContainer>
      </CompanyWrapper>
    </Section>
  );
};

export default Company;

interface FavoriteCompanyProps {
  company: ICompany;
}

interface CompanyAvatarProps {
  $src: string;
}

const Section = styled.section`
  width: 536px;
  min-height: 268px;
  background: ${colors.white};
  border-radius: 6px;
  margin: 12px;
  padding: 26px 32px;
  display: flex;
  position: relative;
`;

const P = styled.p`
  color: ${colors.darkGray};
  margin: 8px 0px 2px;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
`;

const CompanyAvatarContainer = styled.div`
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
  border-radius: 6px;
  width: 168px;
  height: 216px;
  margin-right: 16px;
`;

const CompanyAvatarWrapper = styled.div`
  min-width: 166px;
  height: 156px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.gray};
`;

const CompanyAvatarFooter = styled.div`
  text-align: center;
  color: ${colors.darkGray};
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: ${colors.black};
`;

const CompanyAvatar = styled.div<CompanyAvatarProps>`
  background: url(${({ $src }) => $src});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const A = styled.a`
  cursor: pointer;
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 285px;
`;

const CompanyMain = styled.div`
  min-height: 100px;
`;

const CompanyWrapper = styled.div`
  width: 100%;
`;

const CompanyFooter = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray};
  margin-bottom: 24px;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.black};
`;

const FooterItemFirst = styled.div`
  max-width: 170px;
  width: 100%;
  border-right: 1px solid ${colors.gray};
  padding: 0px 20px 12px 0px;
`;

const FooterItemSecond = styled.div`
  padding: 0px 0px 12px 20px;
  width: 100%;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
