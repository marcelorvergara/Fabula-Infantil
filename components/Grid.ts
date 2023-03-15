import styled from "styled-components";

export const Container = styled.div`
  max-width: 1360px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  &::before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

function getWidthGrid(value: number) {
  if (!value) return;
  let width = (value / 12) * 100;

  return `width: ${width}%;`;
}

interface ColumnProps {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

export const Column = styled.div<ColumnProps>`
  float: left;
  padding: 0.45rem;
  min-height: 1px;
  box-sizing: border-box;

  @media only screen and (min-width: 768px) {
    width: ${({ mobile }) => mobile && getWidthGrid(mobile)};
  }

  @media only screen and (min-width: 768px) {
    width: ${({ tablet }) => tablet && getWidthGrid(tablet)};
  }

  @media only screen and (min-width: 1024px) {
    width: ${({ desktop }) => desktop && getWidthGrid(desktop)};
  }
`;
