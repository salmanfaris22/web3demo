import React from "react";
import styles from "./FooterContent.module.scss";

const FooterContent = () => {
  return (
    <div className={styles.container}>
      <h2>Risk warning</h2>
      <p>
        Trading in FX and CFDs on margin entails a high level of risk and may
        not be suitable for all investors. At Exdex, margin trading can
        significantly enhance potential gains but also amplifies potential
        losses, sometimes exceeding your original investment. This type of
        trading requires careful consideration of your financial situation,
        experience level, and tolerance for risk. It’s essential to acknowledge
        the possibility of losing more than your initial deposit due to the
        leveraged nature of margin trading. Before engaging in any transactions,
        we strongly encourage all traders to thoroughly understand these risks,
        set clear investment objectives, and implement robust risk management
        strategies. Independent financial advice should be sought if you have
        any concerns or require guidance in assessing your financial readiness.
        To ensure a comprehensive understanding of all risks involved, please
        read our Risk Disclosure carefully before opening an account with Exdex.
      </p>
      <h2>AI Insights Disclaimer</h2>
      <p>
        Exdex’s AI-powered insights are developed to provide users with
        data-driven information, enhancing decision-making in trading. However,
        these insights are based on historical data and predictive algorithms,
        which do not guarantee profitability and are not infallible. AI insights
        should be used as part of a broader strategy and not as a sole basis for
        making trades. We advise traders to employ sound risk management
        practices, review personal trading goals, and assess market conditions
        independently to make fully informed decisions. Exdex encourages users
        to diversify their strategies, as no AI-generated insights or trading
        predictions are risk-free or assured to yield favorable results
      </p>
      <h2>Legal Disclaimer</h2>
      <p>
        Exdex provides links to third-party economic and market information as a
        courtesy to its clients, offering a broader perspective on market trends
        and analyses. However, Exdex does not endorse any specific viewpoints,
        recommendations, or analyses from these sources, nor do we claim
        responsibility for the accuracy or reliability of third-party
        information. It is imperative for clients to approach these resources
        with discernment and consider all external opinions in the context of
        their unique investment strategies, objectives, and risk tolerance.
        Remember, past performance or historical data referenced in these
        sources are not reliable indicators of future results. Exdex strongly
        encourages all clients to exercise due diligence by verifying the
        credibility of claims and representations made by third-party advisors,
        analysts, or platform providers. Any trading decisions or financial
        actions based on third-party insights are at the sole discretion of the
        client, and Exdex assumes no liability for any financial losses or
        impacts on principal investments resulting from the use of or reliance
        on such information.
      </p>
      <h2>Exdex Academy</h2>
      <p>
        At Exdex Academy, we’re committed to educating and empowering our users
        to navigate the financial markets with confidence. Our courses cover all
        aspects of financial trading, including forex, crypto, stocks, and CFDs,
        ensuring that every trader—from beginner to advanced—gains valuable
        insights into the market dynamics.
      </p>
      <h2>What You’ll Learn:</h2>
      <p>
        Market Fundamentals: Understand the core principles that drive the
        global financial markets, from economic indicators to market sentiment.
        Technical and Fundamental Analysis: Develop skills in analyzing price
        movements, chart patterns, economic data, and other vital trading
        signals. Risk Management and Trading Psychology: Learn essential risk
        management techniques, set realistic goals, and build the mental
        resilience required for effective trading. Opportunities Across
        Financial Markets: Identify trading opportunities in various markets and
        discover strategies that align with your financial goals.Regulatory
        Compliance and Ethical Practices: Understand the importance of
        compliance, regulatory standards, and ethical practices within the
        financial world.
      </p>
    </div>
  );
};

export default FooterContent;
