<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\View;
use AppBundle\Entity\User;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
/**
 * SecurityController
 */
class SecurityController extends Controller
{
	/**
	 * {@inheritdoc}
	 */
	protected function getUserManager()
	{
		return $this->get('fos_user.user_manager');
	}

	/**
	 * {@inheritdoc}
	 */
	protected function loginUser(User $user)
	{
		$security = $this->get('security.context');
		$providerKey = $this->container->getParameter('fos_user.firewall_name');
		$roles = $user->getRoles();
		$token = new UsernamePasswordToken($user, null, $providerKey, $roles);
		$security->setToken($token);
	}

	/**
	 * {@inheritdoc}
	 */
	protected function logoutUser()
	{
		$security = $this->get('security.context');
		$token = new AnonymousToken(null, new User());
		$security->setToken($token);
		$this->get('session')->invalidate();
	}

	/**
	 * {@inheritdoc}
	 */
	protected function checkUser()
	{
		$security = $this->get('security.context');
		if ($token = $security->getToken()) {
			$user = $token->getUser();
			if ($user instanceof User) {
				return $user;
			}
		}
		return false;
	}

	/**
	 * {@inheritdoc}
	 */
	protected function checkUserPassword(User $user, $password)
	{
		$factory = $this->get('security.encoder_factory');
		$encoder = $factory->getEncoder($user);

		if (!$encoder) {
			return false;
		}

		return $encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt());
	}

	/**
     * Login as a User in the application
     *
     * **Request Format**
     *
     *     {
     *         "username": "usuarioprueba",
     *         "password": "sample-password"
     *     }
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Security")
     *
     * @Post("/login", name="_user")
     *
     * @return Response
     */
	public function loginAction()
	{
		$request = $this->getRequest();
        $username = $request->get('username');
        $password = $request->get('password');


        $um = $this->getUserManager();
        $user = $um->findUserByUsername($username);
        if(!$user){
            $user = $um->findUserByEmail($username);
        }

		if (!$user instanceof User) {
			throw new NotFoundHttpException('No existe identificador de Usuario.');
		}

		if (!$this->checkUserPassword($user, $password)) {
			throw new AccessDeniedException('Contraseña incorrecta.');
		}

		$this->loginUser($user);

		return $user;
	}

	/**
     * Logout as a User in the application
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Security")
     *
     * @Post("/logout", name="_user")
     *
     * @return NULL
     */
	public function logoutAction()
	{
		$this->logoutUser();

		return null;
	}

	/**
     * LoginCheck as a User in the application
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Security")
     *
     * @Post("/loginCheck", name="_user")
     *
     * @return User|AccessDeniedException
     */
	public function loginCheckAction()
	{
		if ($user = $this->checkUser()) {
			return $user;
		} else {
			throw new AccessDeniedException();
		}
	}
}
