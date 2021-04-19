import {useColorMode, IconButton, Box} from '@chakra-ui/react';
import {SunIcon, MoonIcon} from '@chakra-ui/icons';

const DarkModeSwitch = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	const iconColor = {
		light: 'black',
		dark: 'white',
	};
	return (
		<Box minWidth={['100%','100%','100%','auto']} textAlign={'center'}>
			<IconButton
				aria-label='Toggle dark mode'
				icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
				onClick={toggleColorMode}
				color={iconColor[colorMode]}
			/>
		</Box>
	);
};

export default DarkModeSwitch;
