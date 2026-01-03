import { Box, Button, Typography } from "@mui/material";

type ErrorStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
};

export default function ErrorState({
  title = "다시 로그인 하세요",
  description,
  actionLabel = "Log in",
  onAction,
  fullScreen = true,
}: ErrorStateProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: fullScreen ? "100vh" : 320,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "rgba(0,0,0,0.65)",
        borderRadius: fullScreen ? 0 : 2,
      }}
    >
      <Box
        sx={{
          width: "min(520px, 92%)",
          height: 360,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          bgcolor: "rgba(0,0,0,0.55)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {description}
          </Typography>
        )}

        {onAction && (
          <Button
            onClick={onAction}
            sx={{
              mt: 1,
              px: 4,
              py: 1.2,
              borderRadius: 999,
              bgcolor: "#fff",
              color: "#000",
              fontWeight: 700,
              "&:hover": { bgcolor: "#f2f2f2" },
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
