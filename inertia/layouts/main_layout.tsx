import { MainMenuBar } from '~/components/custom/main_menu_bar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainMenuBar />
      {children}
    </>
  )
}
