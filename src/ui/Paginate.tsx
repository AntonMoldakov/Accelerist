import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styled from 'styled-components';

const Paginate = ({ currentPage, totalItemsCount, pageSize, ...paginateProps }: PaginateProps) => {
  const breakLabel =
    currentPage +
    pageSize * (currentPage - 1) +
    '-' +
    (pageSize * currentPage > totalItemsCount ? totalItemsCount : pageSize * currentPage) +
    ' of ' +
    totalItemsCount;
  return (
    <StyledPaginateContainer>
      {totalItemsCount <= pageSize ? (
        <PaginateText> {breakLabel}</PaginateText>
      ) : (
        <ReactPaginate
          breakLabel={breakLabel}
          previousClassName="previous"
          nextClassName="next"
          containerClassName="container"
          previousLabel={'<'}
          nextLabel={'>'}
          {...paginateProps}
          marginPagesDisplayed={0}
          pageRangeDisplayed={0}
        />
      )}
    </StyledPaginateContainer>
  );
};

export default Paginate;

interface PaginateProps extends Omit<ReactPaginateProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> {
  currentPage: number;
  totalItemsCount: number;
  pageSize: number;
}

const PaginateText = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
`;
const StyledPaginateContainer = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
  }
  .next {
    margin-left: 20px;
  }
  li {
    cursor: pointer;
    a {
      font-size: 24px;
    }
  }
  .break {
    a {
      font-weight: normal;
      font-size: 12px;
      line-height: 150%;
    }
    cursor: default;
  }
  .selected {
    display: none;
  }
  .previous {
    margin-right: 20px;
  }
  .disabled {
    display: none;
  }
`;
