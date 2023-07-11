import { Global } from '@mantine/core';
import bold from '/TWKEverett-Bold-web.woff2';
import light from '/TWKEverett-Light-web.woff2';
import regular from '/TWKEverett-Regular-web.woff2';

export const CustomFonts = () => {
    console.log('BOLD', bold);

    return (
        <Global
          styles={[
                {
                    '@font-face': {
                        fontFamily: 'TWKEverett',
                        src: `url('${bold}') format("woff2")`,
                        fontWeight: 700,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'TWKEverett',
                        src: `url('${light}') format("woff2")`,
                        fontWeight: 200,
                        fontStyle: 'normal',
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'TWKEverett',
                        src: `url('${regular}') format("woff2")`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                    },
                },
            ]}
        />
    );
};
