import * as React from 'react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuLink,
    MenuPopover,
    useMenuButtonContext,
} from '@reach/menu-button'
import {AnimatePresence, motion } from 'framer-motion'

const LINKS = [
    {name: 'Déroulement de la journée', to: '/Agenda'},
    {name: 'Confirmer votre présence', to: '/save-the-date'},
    {name: 'Notre histoire', to: '/histoire'},
    {name: 'Galérie Photos', to: '/galerie'},
]

const MOBILE_LINKS = [{name: 'Home', to: '/'}, ...LINKS]

export const Navbar = () => {
     return (
         <div className="px-5 sm:px-6 lg:px-12 py-9 lg:py-12">
            <nav className="flex items-center justify-between max-w-8xl">
                <Link to="/" className="underlined block whitespace-nowrap text-4xl font-medium focus:outline-none transition">
                    <h1 className="hidden font-Matter lg:flex">
                        Ruth <i className="fa fa-heart" style={{fontSize:"36px", color:"#C6930A", margin: "0 6px 2px 6px"}}></i> Dimitri
                    </h1>
                    <h1 className="text-left font-Matter relative lg:hidden">
                        <p>Ruth <i className="fa fa-heart absolute" style={{fontSize:"36px", color:"#C6930A", margin: "0 6px 2px 6px"}}></i></p>
                        <p>Dimitri</p>
                    </h1>
                </Link>
                <ul className="hidden lg:flex">
                    {LINKS.map(link => {
                        return <NavLink to={link.to} key={link.to}>{ link.name }</NavLink>
                    })}
                </ul>
                <div className="lg:hidden flex items-center justify-center">
                    <div className="block lg:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </nav>
         </div>
     )
}

const NavLink = ({to, ...rest}) => {
    const location = useLocation()
    let isSelected = location.pathname === to || location.pathname.startsWith(`${to}/`)
    return (
        <li className="px-5 py-2">
            <Link 
                className={clsx(
                    'relative block whitespace-nowrap text-lg font-medium text-gray focus:outline-none',
                    {
                    'text-black': isSelected,
                    },
                )}
                to={to}
                {...rest}
            />
        </li>
    )
}

const topVariants = {
    open: {rotate: 45, y: 7},
    closed: {rotate: 0, y: 0},
  }
  
  const centerVariants = {
    open: {opacity: 0},
    closed: {opacity: 1},
  }
  
  const bottomVariants = {
    open: {rotate: -45, y: -5},
    closed: {rotate: 0, y: 0},
  }

  function MobileMenu() {
    return (
      <Menu>
        {({isExpanded}) => {
          const state = isExpanded ? 'open' : 'closed'
          return (
            <>
              <MenuButton className="focus:border-secondary hover:border-secondary text-primary border-secondary inline-flex items-center justify-center p-1 w-14 h-14 border-2 rounded-full focus:outline-none transition">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    animate={state}
                    variants={topVariants}
                    x="6"
                    y="9"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={state}
                    variants={centerVariants}
                    x="6"
                    y="15"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={state}
                    variants={bottomVariants}
                    x="6"
                    y="21"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </MenuButton>
  
              <MobileMenuList />
            </>
          )
        }}
      </Menu>
    )
  }

  function MobileMenuList() {
    const {isExpanded} = useMenuButtonContext()
  
    React.useEffect(() => {
      if (isExpanded) {
        // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
        // document.body.classList.add('fixed')
        document.body.classList.add('overflow-y-hidden')
        // alternatively, get bounding box of the menu, and set body height to that.
        document.body.style.height = '100vh'
      } else {
        // document.body.classList.remove('fixed')
        document.body.classList.remove('overflow-y-hidden')
        document.body.style.removeProperty('height')
      }
    }, [isExpanded])
  
    return (
      <AnimatePresence>
        {isExpanded ? (
          <MenuPopover
            position={r => ({
              top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.25rem)`, // 2.25 rem = py-9 from navbar
              left: 0,
              bottom: 0,
              right: 0,
            })}
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <motion.div
              initial={{y: -50, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: -50, opacity: 0}}
              transition={{duration: 0.15, ease: 'linear'}}
              style={{ zIndex: '4000000', display: 'flex', flexDirection: 'column' }}
              className="bg-white z-50 flex flex-col pb-12 h-full border-t border-lightgray overflow-y-scroll"
            >
              <MenuItems className="p-0 bg-transparent border-none flex flex-col">
                {MOBILE_LINKS.map(link => (
                  <MenuLink
                    className="text-primary hover:bg-whitesmoke focus:bg-secondary hover:text-primary px-6 py-9 border-b border-lightgray"
                    key={link.to}
                    as={Link}
                    to={link.to}
                  >
                    {link.name}
                  </MenuLink>
                ))}
              </MenuItems>
            </motion.div>
          </MenuPopover>
        ) : null}
      </AnimatePresence>
    )
  }