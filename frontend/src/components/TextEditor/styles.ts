import styled from 'styled-components';

export const Container = styled.div`
  .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  .ql-toolbar.ql-snow {
    display: flex;
    gap: 8px;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    padding: 16px;
  }

  .ql-editor {
    width: 8.5in;
    min-height: 90vh;
    padding: 1in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  @page {
    margin: 1in;
  }

  @media print {
    .ql-editor {
      width: 6.5in;
      height: 9in;
      padding: 0;
      margin: 0;
      box-shadow: none;
      align-self: flex-start;
    }

    .ql-toolbar.ql-snow {
      display: none;
    }
  }
`;
