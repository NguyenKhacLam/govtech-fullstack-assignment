import { Box, Radio, Typography } from "@mui/material";

function OptionItem({
  option,
  totalVote,
  value,
  currentId,
  onChange,
  canVote,
}) {
  const votePercent = totalVote > 0 ? (option.count / totalVote) * 100 : 0;

  return (
    <Box
      position="relative"
      width="100%"
      height="50px"
      backgroundColor="#F9F9F9"
      borderRadius="16px"
    >
      <Box
        height="100%"
        width={`${votePercent.toFixed()}%`}
        backgroundColor="#E9F2F9"
        borderRadius="16px 0px 0px 16px"
      />
      <Box
        position="absolute"
        top="50%"
        left="20px"
        sx={{ transform: "translate(0, -50%)" }}
      >
        <Box display="flex" alignItems="center">
          {canVote && (
            <Radio
              value={value}
              onChange={() => {
                onChange(value);
              }}
              checked={currentId === value}
            />
          )}

          <Typography variant="subtile1" fontWeight={600}>
            {option.name}
          </Typography>
        </Box>
      </Box>

      <Box
        position="absolute"
        top="50%"
        right="20px"
        sx={{ transform: "translate(0, -50%)" }}
      >
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="subtitle2" fontWeight={300}>
            Voted: {option.count}.
          </Typography>
          <Typography variant="subtitle2" fontWeight={600}>
            {votePercent.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OptionItem;
