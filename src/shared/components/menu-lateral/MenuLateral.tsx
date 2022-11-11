import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts";

interface IMenuLateralProps {
  children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(18), width: theme.spacing(18) }}
              src="https://scontent.ffln1-1.fna.fbcdn.net/v/t1.6435-9/46501964_10215247847922755_2301475907941957632_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=84a396&_nc_eui2=AeE5JjNT9M_P_KMFPPh2I3xXvH6nKE2NOjW8fqcoTY06NdSnqm37GnWKkWKdjkDyWB8&_nc_ohc=7Ho2J5xlx2UAX_Zsa2C&_nc_ht=scontent.ffln1-1.fna&oh=00_AfDw9QOw6lktKW75FPZNGO9thIxBeae5jav9_CWUiWlI_Q&oe=6394C8AB"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
