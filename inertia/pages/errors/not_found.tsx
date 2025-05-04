import MainContainer from '~/components/custom/main_container'

export default function NotFound() {
  return (
    <>
      <MainContainer>
        <div className="title">Page not found</div>

        <span>This page does not exist.</span>
      </MainContainer>
    </>
  )
}
