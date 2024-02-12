const fs = require('fs');

// Read the content of ethereum.json
fs.readFile('ethereum.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading ethereum.json:', err);
        return;
    }

    try {
        // Parse JSON data
        const ethereumData = JSON.parse(data);

        // Filter out the data related to Polygon
        const polygonData = {
            id: 'polygon',
            description: 'Polygon is a protocol and a framework for building and connecting Ethereum-compatible blockchain networks. It offers scalability solutions and aims to transform Ethereum into a full-fledged multi-chain system.',
            tags: ['layer 2', 'ethereum scalability', 'sidechains', 'pos', 'plasma'],
            coin_details: {
                name: 'Polygon',
                symbol: 'MATIC',
                logo: 'logo/polygon.png',
                max_supply: '10,000,000,000'
            },
            chain_details: ethereumData.chain_details.filter(detail => detail.name !== 'Chain Layer' || detail.type === 'L2'),
            official_links: ethereumData.official_links,
            social_platforms: ethereumData.social_platforms,
            data_aggregator: ethereumData.data_aggregator.filter(agg => agg.url.includes('polygon')),
            explorers: ethereumData.explorers.filter(explorer => explorer.url.includes('polygon')),
            bridges: ethereumData.bridges.filter(bridge => bridge.url.includes('polygon')),
            bounty: ethereumData.bounty,
            grants: ethereumData.grants.filter(grant => grant.name.includes('Polygon')),
            faucets: ethereumData.faucets,
            rpcs: ethereumData.rpcs,
            wallets: ethereumData.wallets,
            oracles: ethereumData.oracles
        };

        // Write the filtered data to polygon.json
        fs.writeFile('polygon.json', JSON.stringify(polygonData, null, 4), err => {
            if (err) {
                console.error('Error writing to polygon.json:', err);
                return;
            }
            console.log('polygon.json has been created successfully.');
        });
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
});