exports.scoreProduct=function (product, answers) {
    let results = [];
    let score = 0;

    // 5%
    if (product.gender.includes(answers.gender)) {
        score += 5;
        results.push(`Perfect for ${answers.gender}'s fragrances`);
    }

    // 20%
    if (product.occasion.includes(answers.occasion)) {
        score += 20;
        results.push(`Great for ${answers.occasion} occasions`);
    }

    // 10%
    if (product.weather.includes(answers.weather)) {
        score += 10;
        results.push(`Ideal for ${answers.weather} weather`);
    }

    // 25%
    if (product.scentProfile === answers.scentProfile) {
        score += 25;
        results.push(`Matches your ${answers.scentProfile} scent preference`);
    }

    // 15%
    if (product.projection === answers.projection) {
        score += 15;
        const formattedProjection = answers.projection.charAt(0).toUpperCase() + answers.projection.slice(1);
    results.push(`${formattedProjection} projection — just as you prefer`);
    }

    // 15%
    if (product.longevity === answers.longevity) {
        score += 15;
        results.push(`Matches your ${answers.longevity} longevity preference`);
    }

    // 10%
    if (product.adventurousness === answers.adventurousness) {
        score += 10;
        results.push(`Suits your ${answers.adventurousness} fragrance style`);
    }

    return {
        score,
        results
    };
}