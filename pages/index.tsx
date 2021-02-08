import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Grid, AppBar, Toolbar, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: '20px'
  },
  media: {
    height: 140,
  },
  setup: {
    marginRight:'40px',
    float: 'left',
    overflow: 'hidden'
  },
  mainDiv:{
    paddingTop: '40px',
    paddingBottom: '15px'
  },
  link:{
    textDecoration: 'none'
  }
});

const Home = ({products}) =>{
  const classes = useStyles();

  return (
    <AppBar position="static">
    <Toolbar>
        <Grid justify="space-between"
              container spacing={2}
              className={classes.mainDiv}>
            {
                 products.map(product => (
                  <Slide key={product.id} direction="up" in={true}>
                    <Grid item md={3}>
                        <Link href={`/product/${product.id}`}>
                        <a className={classes.link}>
                          <Card> 
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={product.imageUrl}
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.quantity > 0 ? "Latest" : "Out Of Stock"}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button size="small" color="primary">
                                Price
                              </Button>
                              <Button size="small" color="primary">
                                {product.price}
                              </Button>
                            </CardActions>
                          </Card>
                        </a>
                      </Link>
                      </Grid>
                    </Slide>
                  ))

          }
        </Grid>
        </Toolbar>
        </AppBar>
  );
 }

 export async function getStaticProps(){
  const res = await fetch(`http://localhost:3000/api/products`);
  const data = await res.json();
  return {
    props:{
      products:data
    }
  }
 }
 

 export default Home
