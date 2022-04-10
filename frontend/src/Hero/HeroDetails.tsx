import { Container, Card, CardContent, Grid, Typography } from '@mui/material';
import { Heroes } from '../App';

export default function HeroList({ hero, isLoggedIn }: { hero: Heroes, isLoggedIn: boolean }) {

    return (
        <Container>
            <Grid item xs={12} md={12} key={hero.id}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography component="h2" variant="h5">
                            <p>{hero.name}</p>
                        </Typography>
                        <Typography component="h5" variant="h5">
                            <p><strong>Power:</strong> {hero.power}</p>
                        </Typography>
                        <Typography component="h6" variant="h6">
                            <p>{hero.shortDescription}</p>
                        </Typography>
                        <Typography component="p" variant="body1">
                            <p><strong>Description:</strong> {hero.description}</p>
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            <p><strong>Created At:</strong> {hero.createdAt}</p>
                        </Typography>
                        <Typography component="p" variant="subtitle1">
                            <p><strong>UpdatedAt:</strong> {hero.createdAt}</p>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Container >
    );
}
