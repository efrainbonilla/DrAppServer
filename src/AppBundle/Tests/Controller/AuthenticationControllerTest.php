<?php

namespace AppBundle\Tests\Controller;

use AppBundle\Tests\WebTestCase;
use Symfony\Component\HttpKernel\Client;

class AuthenticationControllerTest extends WebTestCase
{
    /**
     * @var Client
     */
    protected $client;

    /**
     * {@inheritdoc}
     */
    public function setUp()
    {
        $this->client = static::createClient();
    }

    /**
     * test login
     * @return void
     */
    public function testLoginFailure()
    {
        $data = array(
            'username' => 'user',
            'password' => 'userwrongpass'
        );

        $this->client->request(
            'POST',
            $this->getUrl('login_check'),
            $data
        );

        $this->assertJsonResponse($this->client->getResponse(), 401);
    }

    /**
     * test login
     * @return void
     */
    public function testLoginSuccess()
    {
        $data = array(
            'username' => 'user',
            'password' => 'password'
        );

        $this->client->request(
            'POST',
            $this->getUrl('login_check'),
            $data
        );

        $this->assertJsonResponse($this->client->getResponse(), 200);
        $response = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $response);
        $this->assertArrayHasKey('data', $response);

        // check token from query string work
        $client = static::createClient();
        $client->request(
            'HEAD',
            $this->getUrl('app_ping'),
            array( $this->queryParameterName => $response['token'] )
        );

        $this->assertJsonResponse($client->getResponse(), 200, false);

        // check token work

        $client = static::createClient();
        $client->setServerParameter(
            'HTTP_Authorization',
            sprintf('%s %s', $this->authorizationHeaderPrefix, $response['token'])
        );
        $client->request('HEAD', $this->getUrl('app_ping'));

        $this->assertJsonResponse($client->getResponse(), 200, false);

        //check token work several times, as long as it is valid

        $client = static::createClient();
        $client->setServerParameter(
            'HTTP_Authorization',
            sprintf('%s %s', $this->authorizationHeaderPrefix, $response['token'] . 'changed')
        );
        $client->request('HEAD', $this->getUrl('app_ping'));

        $this->assertJsonResponse($client->getResponse(), 401, false);

        // check error if no authorization header

        $client = static::createClient();
        $client->request('HEAD', $this->getUrl('app_ping'));

        $this->assertJsonResponse($client->getResponse(), 401, false);
    }
}
