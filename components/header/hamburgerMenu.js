import {HamburgerIcon, SmallCloseIcon} from '@chakra-ui/icons';

export default function HamburgerMenu({setMenu, menu}) {
	return menu ? (
		<SmallCloseIcon
			display={['block', 'block', 'block', 'none']}
			w={8}
			h={8}
			color='red.500'
			onClick={() => setMenu(!menu)}
		/>
	) : (
		<HamburgerIcon
			display={['block', 'block', 'block', 'none']}
			w={8}
			h={8}
			color='red.500'
			onClick={() => setMenu(!menu)}
		/>
	);
}
