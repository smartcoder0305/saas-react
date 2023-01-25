import { Typography, Box, Button, Grid, Card } from "@mui/material";
import { Add } from "@mui/icons-material";
import VideoTabCard from "./VideoTabCard";

const Index = (): JSX.Element => {
	return (
		<Box sx={{ mt: 4, ml: 1, p: 3 }}>
			<Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
				<Grid container spacing={1}>
					<Grid item xs={8}>
						<Typography sx={{ fontSize: 16 }}>
							Candidate’s video submissions will below below, you can also ask candidate’s to submit further video.
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Button startIcon={<Add />} sx={{ color: "secondary", fontSize: 15 }}>
							Request video
						</Button>
					</Grid>
				</Grid>
			</Card>

			{/* Tell us more about yourself form*/}

			<VideoTabCard
				videoRatingName="candidate1"
				title="Tell us about yourself"
				submitDate="Submitted on 12 Mar 2023"
				video="/dummy1.png"
			/>
			{/* Tell us more about yourself form*/}
			<VideoTabCard
				videoRatingName="candidate2"
				title="Why do you want to be part of this program and what would you like to gain?"
				submitDate="Submitted on 12 Mar 2023"
				video="/dummy2.png"
			/>
		</Box>
	);
};

export default Index;
