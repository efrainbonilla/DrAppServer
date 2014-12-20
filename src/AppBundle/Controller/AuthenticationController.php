<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * AuthenticationController
 */
class AuthenticationController extends Controller
{
    /**
     * Demostration authentication result
     *
     * @return JsonResponse
     */
    public function pingAction()
    {
        return new JsonResponse();
    }

    /**
     * Token
     *
     * @return Resonse
     */
    public function getTokenAction()
    {
    	return new Response('', 401);
    }
}
