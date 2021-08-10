import Link from 'next/link';
import { CompanyAvatarIcon } from 'public/icons/components';
import React from 'react';
import { ICompany } from 'services/types';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const FavoriteCompany = ({ company }: FavoriteCompanyProps) => {
  return (
    <Root>
      <SectionBody>
        <AvatarContainer>
          {!company.logo ? <CompanyAvatarIcon width={24} height={48} /> : <CompanyAvatar $src={company.logo} />}
        </AvatarContainer>
        <div>
          <Link href={'/company/' + company.id}>
            <A>{company.name}</A>
          </Link>
          <p>Priority Ranking 4</p>
        </div>
      </SectionBody>
      <p>CSR Focus</p>
      <ul>
        <li>No Information</li>
      </ul>
    </Root>
  );
};

export default FavoriteCompany;

interface FavoriteCompanyProps {
  company: ICompany;
}

interface CompanyAvatarProps {
  $src: string;
}

const Root = styled.section`
  background-color: ${colors.white};
  width: 256px;
  min-height: 156px;
  border-radius: 6px;
  margin: 12px;
  padding: 24px;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.darkGray};
  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    color: ${colors.black};
    li {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const A = styled.a`
  display: inline-block;
  width: 140px;
  line-height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-weight: 500;
`;

const AvatarContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 12px;
`;

const SectionBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CompanyAvatar = styled.div<CompanyAvatarProps>`
  background: url(${({ $src }) => $src});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  width: 100%;
  height: 100%;
`;
