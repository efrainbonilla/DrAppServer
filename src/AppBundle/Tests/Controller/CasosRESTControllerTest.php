<?php

namespace AppBundle\Tests\Controller;

use AppBundle\Entity\Casos;
use AppBundle\Tests\WebTestCase;

/**
 * CasosRESTControllerTest
 */
class CasosRESTControllerTest extends WebTestCase
{

	/**
	 * @param  array $user
	 * @return void
	 * @dataProvider getUsers
	 */
	public function testGetCasos($user)
	{
		$client = $this->createAuthenticatedClient($user);
		$client->request('GET', $this->getUrl('cget_casos'));

		$response = $client->getResponse();
		$this->assertJsonResponse($response, 200);

		/*$content = json_decode($response->getContent(), true);
		$this->assertInternalType('array', $content);
		$this->assertCount(10, $content);

		$page = $content[0];
		$this->assertArrayHasKey('caseTitle', $page);
		$this->assertArrayHasKey('caseContent', $page);
		$this->assertArrayHasKey('caseCreatedAt', $page);*/
	}

	/**
	 * @param  array $user
	 * @return void
	 * @dataProvider getUsers
	 */
	public function testGetCaso($user)
	{
		$client = $this->createAuthenticatedClient($user);
		$client->request('GET', $this->getUrl('get_casos', array('entity' => 'undefined')));

		$response = $client->getResponse();
		$this->assertJsonResponse($response, 200);

		/*$content = json_decode($response->getContent(), true);
		$this->assertInternalType('array', $content);

		$this->assertArrayHasKey('caseTitle', $content);
		$this->assertArrayHasKey('caseContent', $content);
		$this->assertArrayHasKey('caseCreatedAt', $content);*/
	}
	/**
	 * @param  array $user
	 * @return void
	 * @dataProvider getUsers
	 */
	public function testPostCaso($user)
	{
		$client = $this->createAuthenticatedClient($user);
		$rand = rand();

		$client->request(
			'POST',
			$this->getUrl('post_casos'),
			array(
				'caseAuthor' => '1',
				'caseTitle' => 'Titulo de prueba ' . $rand,
				'caseContent' => 'Contenido de prueba ' . $rand,
				'caseStatus' => 'publish',
				'commentStatus' => 'open'
			)
		);

		$response = $client->getResponse();

		if ($user === 'admin') {
			$this->assertJsonResponse($response, 201, false);
		} else {
			$this->assertJsonResponse($response, 403);
		}
	}

	/**
	 * @return array
	 */
	public function getUsers()
	{
		return array(
			array('user'),
            /*array('admin')*/
		);
	}
}
