const { test, trait, afterEach } = use('Test/Suite')('Post');
const UrlRepository = use('App/Repositories/UrlRepository');
const Database = use('Database');

trait('Test/ApiClient');

afterEach(async () => {
    await Database.raw(`delete from url where id > 0`);
});

test('get single url', async ({ client }) => {
    const urlRepository = new UrlRepository();
    const { long, short } = await urlRepository.save({ long: 'https://www.wikipedia.com/', short: 'aBcDe' });
    const response = await client.get(`/url/shorts/${short}`).end();

    // faulty function
    // response.assertRedirect(long);
    response.assertStatus(200);
});

test('get not-existent url', async ({ client }) => {
    const shortURL = "aBcDe";
    const response = await client.get(`/url/shorts/${shortURL}`).end();

    response.assertStatus(404);
    response.assertError(
        {
            message: 'URL not found',
        }
    );
});

test('post valid long url and short', async ({ client, assert }) => {
    const payload = {
        long: "wikipedia.org",
        short: "aBcDe",
    };

    const response = await client.post(`/url/shorts/`).send(payload).end();
    response.assertStatus(201);
    assert.equal(response.body.long, payload.long);
    assert.equal(response.body.short, payload.short);
});

test('post duplicate short', async ({ client, assert }) => {
    const payload = {
        long: "https://www.wikipedia.org/",
        short: "aBcDe",
    };

    const urlRepository = new UrlRepository();
    await urlRepository.save(payload);

    const response = await client.post(`/url/shorts/`).send(payload).end();

    response.assertStatus(400);

    response.assertError([
        {
            field: 'short',
            validation: 'notExists',
            message: 'Short url is already in use',
        }
    ]);
});

test('post with empty payload', async ({ client }) => {
    const response = await client.post(`/url/shorts/`).send({}).end();
    response.assertStatus(400);
    response.assertError([{
        field: "long",
        message: "Long url is required",
        validation: "required",
    }]);
})

test('post valid long url and empty short', async ({ client, assert }) => {
    const payload = {
        long: "https://www.wikipedia.org/",
    };

    const response = await client.post(`/url/shorts/`).send(payload).end();
    response.assertStatus(201);
    assert.equal(response.body.long, payload.long);
    assert.isString(response.body.short);
    assert.equal(response.body.short.length, 10);
});

test('post invalid format', async ({ client }) => {
    const payload = {
        long: {},
        short: [],
    };

    const response = await client.post(`/url/shorts/`).send(payload).end();
    response.assertStatus(400);
    response.assertError([
        {
            message: "Long url is required",
            field: "long",
            "validation": "required",
        },
        {
            message: "Long url should be a valid URL",
            field: "long",
            validation: "string",
        },
        {
            message: "Long url should be a valid URL with no more than 2048 characters",
            field: "long",
            validation: "validUrl",
        },
        {
            message: "Short url should be a valid URL",
            field: "short",
            validation: "string",
        }
    ]);
});

test('post invalid url > 2048 characters', async ({ client }) => {
    const payload = {
        long: "https://www.wikipedia.org/Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean",
        short: "aBcDe",
    };

    const response = await client.post(`/url/shorts/`).send(payload).end();
    response.assertStatus(400);
    response.assertError([
        {
            field: "long",
            message: "Long url should be a valid URL with no more than 2048 characters",
            validation: "validUrl",
        },
    ]);
});

test('post bad url format', async ({ client }) => {
    const payload = {
        long: "wikipediaorg/Lorem",
        short: "aBcDe",
    };

    const response = await client.post(`/url/shorts/`).send(payload).end();
    response.assertStatus(400);
    response.assertError([
        {
            field: "long",
            message: "Long url should be a valid URL with no more than 2048 characters",
            validation: "validUrl",
        },
    ]);
});

