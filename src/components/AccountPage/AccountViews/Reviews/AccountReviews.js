import { useEffect, useState } from "react";
import { getRequest } from "../../../../sevices/service";
import Review from "../../../Shared/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AccountReviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getUserReviews = async () => {
      const response = await getRequest('http://localhost:3001/reviews/userReviews', user.token);
      const userReviews = await response.json();
      setReviews(userReviews);
    }
    getUserReviews();
  }, [user.token]);

  return (
    <div className="account__reviews account__view">
      <div className="account__reviews--heading-wrapper">
        <div className="account__reviews--icon-wrapper">
          <FontAwesomeIcon icon={faStar} className="account__reviews--icon" />
        </div>
        <h2 className="account__reviews--heading">My Reviews</h2>
      </div>
      {reviews.map(review => (
        <Review key={review._id} review={review} userInfo={user} page='account' />
      ))}
    </div>
  )
}

export default AccountReviews;