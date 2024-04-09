import { CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomRating from './CustomRating';

export default function CustomCard({item}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = React.useState(1);

  

  const handlerPreOrder = (id) => {
    history.push(`/preOrder/${id}`);
  };

  const onActionAreaClick = (id) => {
    history.push(`/product/${id}`);
  };

  const getDiscountedPrice = (price, discountPercentage) => {
    const discount = (price * discountPercentage) / 100;
    const discountedPrice = price - discount;
    return Math.floor(discountedPrice); // Use Math.floor() to convert the result to an integer
  };

  return (
    <Card style={{ maxWidth: 345, height: '300px', marginBottom: 16 }}>
      <CardActionArea onClick={() => onActionAreaClick(item._id)}>
        <CardMedia
          component="img"
          height={140}
          image={item.image}
          alt="Product Image"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <CardContent>
          <Typography
            noWrap
            gutterBottom
            variant="h6"
            component="div"
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            color="textSecondary"
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              maxHeight: '3em',
            }}
          >
            {item.description}
          </Typography>
          <CustomRating value={item.rating} text={item.numReviews} />
          
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ my: 1 }}
          >
             {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>

    
    </Card>
  );
}