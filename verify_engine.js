async function verify() {
    const tests = [
        { board: 'CBSE', className: '10', subject: 'Science' },
        { board: 'ICSE', className: '12', subject: 'Physics' }
    ];

    console.log("Starting Verification...\n");

    for (const test of tests) {
        console.log(`TESTING: ${test.board} Class ${test.className} ${test.subject}`);
        try {
            const start = Date.now();
            const response = await fetch('http://localhost:5000/api/generate-paper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(test)
            });
            const data = await response.json();
            const duration = (Date.now() - start) / 1000;

            if (data.paper && data.paper.sections) {
                console.log(`[PASS] Generated in ${duration}s`);
                console.log(`       Preview: ${data.paper.sections.length} sections found.`);
                console.log(`       First Question: ${data.paper.sections[0].questions[0].text.substring(0, 50)}...`);
            } else {
                console.log(`[FAIL] No valid paper returned.`);
                if (data.error) console.log(`       Error: ${data.error}`);
            }
        } catch (error) {
            console.log(`[FAIL] Request failed: ${error.message}`);
        }
        console.log("-----------------------------------------");
    }
}

verify();
