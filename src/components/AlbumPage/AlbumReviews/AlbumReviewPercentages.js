const AlbumReviewPercentages = ({ ratingsBreakdown, totalReviews }) => {
  const calculateRatingsAverage = () => {

    if (totalReviews.length !==  1) {
      const starsArray = Object.keys(ratingsBreakdown).map(key => parseInt(key));

      const ratingsTotal = starsArray.reduce((previousValue, currentValue) => {
        return (previousValue) + (currentValue * ratingsBreakdown[currentValue]);
      }, 0);
  
      const weightedAverage = ratingsTotal / totalReviews;
  
      return weightedAverage.toFixed(1);  
    }

    return Object.values(ratingsBreakdown).forEach(value => value !== 0);
  }

  const ratingsAverage = calculateRatingsAverage();

  return (
    <div className="album-page__reviews--review-percentages">
      <h3 className="album-page__review-percentages--heading">Customer Reviews</h3>
      <div className="album-page__review-percentages--stars-container">
        <div className="album-page__review-percentages--stars" style={{"--rating": `${ratingsAverage}`}} aria-label={`${ratingsAverage} out of 5`}></div>
        <span className="album-page__review-percentages--overall-rating">{ratingsAverage} out of 5</span>
      </div>
      <div className="album-page__review-percentages--total-ratings-wrapper">
        <span className="album-page__review-percentages--total-ratings">{totalReviews} customer ratings</span>
      </div>
      <div className="album-page__review-percentages--ratings-histogram">
        {
          Object.entries(ratingsBreakdown).sort((a, b) => b[0] - a[0]).map(([rating, count]) => (
            <div className="album-page__review-percentages--histogram-rating-container" key={rating}>
              <span className="album-page__review-percentages--histogram-rating-label">{rating}</span>
              <div className="album-page__review-percentages--total-bar">
                <div className="album-page__review-percentages--percentage-bar" style={{'width': `${((count / totalReviews) * 100).toFixed(0)}%`}}></div>
              </div>
              <span className="album-page__review-percentages--histogram-rating-percentage">{((count / totalReviews) * 100).toFixed(0)}%</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AlbumReviewPercentages;