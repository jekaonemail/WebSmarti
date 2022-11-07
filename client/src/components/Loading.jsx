import styled from '@emotion/styled';



const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
`;

const LoadingWrapper = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

const LoadingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Loading = () => {
  return (
    <LoadingContainer>
        Завантаження...
        <LoadingWrapper>
            <LoadingImage src="/loading.webp" />
        </LoadingWrapper>
    </LoadingContainer>
  )
}

export default Loading