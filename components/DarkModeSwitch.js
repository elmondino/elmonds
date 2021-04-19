import {useColorMode, IconButton, Flex} from '@chakra-ui/react';
import {SunIcon, MoonIcon} from '@chakra-ui/icons';

const DarkModeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	const iconColor = {
		light: 'black',
		dark: 'white',
	};
	return (
		<Flex justifyContent={'center'} alignItems={'center'} minWidth={['100%','100%','100%','auto']}>
			<IconButton
				aria-label='Toggle dark mode'
				icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
				onClick={toggleColorMode}
				color={iconColor[colorMode]}
			/>
		</Flex>
	);
};

export default DarkModeSwitch;
