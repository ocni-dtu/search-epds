import { createStyles, Container, Group, Anchor, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(120),
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export const Footer = () => {
    const { classes } = useStyles();

    const links = [
        { label: 'EPDx', link: 'https://epdx.kongsgaard.eu' },
        { label: 'LCAx', link: 'https://lcax.kongsgaard.eu' },
    ];
    const items = links.map((link) => (
        <Anchor<'a'>
          color="dimmed"
          key={link.label}
          href={link.link}
          onClick={(event) => event.preventDefault()}
          size="sm"
        >
            {link.label}
        </Anchor>
    ));
    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Anchor<'a'>
                  color="black"
                  href="https://kongsgaard.eu"
                  onClick={(event) => event.preventDefault()}
                  size="sm"
                >Christian Kongsgaard ApS
                </Anchor>
                    <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
);
};
