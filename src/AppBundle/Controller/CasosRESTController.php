<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Hateoas\Configuration\Route;
use Hateoas\Representation\Factory\PagerfantaFactory;
use AppBundle\Entity\Casos;
use AppBundle\Form\CasosType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\createNotFoundException;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;


/**
 * Casos controller.
 * @RouteResource("Casos")
 */
class CasosRESTController extends VoryxController
{
    /**
     * Get a Casos entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Casos")
     *
     * @return Response
     *
     */
    public function getAction(Casos $entity)
    {
        return $entity;
    }
    /**
     * Get all Casos entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Casos")
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="page", requirements="\d+", default="1", description="Offset from which to start listing notes.")
     * @QueryParam(name="offset", requirements="\d+",nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="20", description="How many notes to return.")
     * @QueryParam(name="sorting", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        if (!($this->get('security.context')->isGranted('ROLE_USER')
                    || $this->get('security.context')->isGranted('ROLE_SUPER_ADMIN'))) {
            throw new AccessDeniedException();
        }

        try {

            $request = $this->container->get('request');

            $user = $this->getUserData();

            $page = $paramFetcher->get('page');
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('sorting');
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();//WHERE

            // if ($this->get('security.context')->isGranted('ROLE_USER') ) {
            //     $filters['caseUser'] = $user->getId();
            // }

            //return array('request' => $order_by);

            $em = $this->getDoctrine()->getManager();
            $datos = array();

            $entities = $em->getRepository('AppBundle:Casos')->findAllPaginated($filters, $order_by, $limit, $page);
            if ($entities) {
                $pagerFactory = new PagerfantaFactory();
                return $pagerFactory->createRepresentation(
                    $entities,
                    new Route($request->get('_route'), array(
                        'limit' => $limit,
                        'page' => $page,
                        'sorting' => $order_by,
                        'user' => $user,
                    ))
                );
            }

            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Create a Casos entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Casos")
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {

        $entity = new Casos();
        $entity->setCaseUser($this->getUserData());

        $form = $this->createForm(new CasosType(), $entity, array("method" => $request->getMethod()));

        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $entity;
        }

        return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
    }
    /**
     * Update a Casos entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Casos")
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Casos $entity)
    {
        try {
            $entity->setCaseUser($this->getUserData());

            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new CasosType(), $entity, array("method" => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                return $entity;
            }

            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Partial Update to a Casos entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @ApiDoc(section="Casos")
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
*/
    public function patchAction(Request $request, Casos $entity)
    {
        return $this->putAction($request, $entity);
    }
    /**
     * Delete a Casos entity.
     *
     * @View(statusCode=204)
     *
     * @ApiDoc(section="Casos")
     *
     * @param Request $request
     * @param $entity
     * @internal param $id
     *
     * @return Response
     */
    public function deleteAction(Request $request, Casos $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();

            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * User data
     *
     * @return Object User
     */
    public function getUserData()
    {
        $userManager = $this->container->get('fos_user.user_manager');

        return $userManager->findUserByUsername($this->getUser()->getUserName());
    }
}
