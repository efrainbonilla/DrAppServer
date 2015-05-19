<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Casos
 *
 * @ORM\Table(name="casos", indexes={@ORM\Index(name="case_user_id", columns={"case_user_id"}), @ORM\Index(name="case_clin_id", columns={"case_clin_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CasosRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */
class Casos
{
    /**
     * @var integer
     *
     * @ORM\Column(name="case_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Expose
     */
    private $caseId;

    /**
     * @var string
     *
     * @ORM\Column(name="case_title", type="text", nullable=false)
     * @Expose
     */
    private $caseTitle;

    /**
     * @var string
     *
     * @ORM\Column(name="case_content", type="text", nullable=false)
     * @Expose
     */
    private $caseContent;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="case_created_at", type="datetime", nullable=false)
     * @Expose
     */
    private $caseCreatedAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="case_update_at", type="datetime", nullable=false)
     * @Expose
     */
    private $caseUpdateAt;

    /**
     * @var string
     *
     * @ORM\Column(name="case_status", type="string", length=20, nullable=false)
     * @Expose
     */
    private $caseStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="comment_status", type="string", length=20, nullable=false)
     * @Expose
     */
    private $commentStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="access_control", type="string", length=20, nullable=false)
     * @Expose
     */
    private $accessControl;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="case_user_id", referencedColumnName="user_id")
     * })
     */
    private $caseUser;

    /**
     * @var \Clinicas
     *
     * @ORM\ManyToOne(targetEntity="Clinicas")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="case_clin_id", referencedColumnName="clin_id")
     * })
     * @Expose
     */
    private $caseClin;



    /**
     * Get caseId
     *
     * @return integer 
     */
    public function getCaseId()
    {
        return $this->caseId;
    }

    /**
     * Set caseTitle
     *
     * @param string $caseTitle
     * @return Casos
     */
    public function setCaseTitle($caseTitle)
    {
        $this->caseTitle = $caseTitle;

        return $this;
    }

    /**
     * Get caseTitle
     *
     * @return string 
     */
    public function getCaseTitle()
    {
        return $this->caseTitle;
    }

    /**
     * Set caseContent
     *
     * @param string $caseContent
     * @return Casos
     */
    public function setCaseContent($caseContent)
    {
        $this->caseContent = $caseContent;

        return $this;
    }

    /**
     * Get caseContent
     *
     * @return string 
     */
    public function getCaseContent()
    {
        return $this->caseContent;
    }

    /**
     * Hook on pre-persist operations
     *
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->caseCreatedAt = new \DateTime;
        $this->caseUpdateAt = new \DateTime;
    }

    /**
     * Get caseCreatedAt
     *
     * @return \DateTime 
     */
    public function getCaseCreatedAt()
    {

        return $this->caseCreatedAt;
    }

    /**
     * Hook on pre-update operations
     * 
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->caseUpdateAt = new \DateTime;
    }

    /**
     * Get caseUpdateAt
     *
     * @return \DateTime 
     */
    public function getCaseUpdateAt()
    {
        return $this->caseUpdateAt;
    }

    /**
     * Set caseStatus
     *
     * @param string $caseStatus
     * @return Casos
     */
    public function setCaseStatus($caseStatus)
    {
        $this->caseStatus = $caseStatus;

        return $this;
    }

    /**
     * Get caseStatus
     *
     * @return string 
     */
    public function getCaseStatus()
    {
        return $this->caseStatus;
    }

    /**
     * Set commentStatus
     *
     * @param string $commentStatus
     * @return Casos
     */
    public function setCommentStatus($commentStatus)
    {
        $this->commentStatus = $commentStatus;

        return $this;
    }

    /**
     * Get commentStatus
     *
     * @return string 
     */
    public function getCommentStatus()
    {
        return $this->commentStatus;
    }

    /**
     * Set accessControl
     *
     * @param string $accessControl
     * @return Casos
     */
    public function setAccessControl($accessControl)
    {
        $this->accessControl = $accessControl;

        return $this;
    }

    /**
     * Get accessControl
     *
     * @return string 
     */
    public function getAccessControl()
    {
        return $this->accessControl;
    }

    /**
     * Set caseUser
     *
     * @param \AppBundle\Entity\User $caseUser
     * @return Casos
     */
    public function setCaseUser(\AppBundle\Entity\User $caseUser = null)
    {
        $this->caseUser = $caseUser;

        return $this;
    }

    /**
     * Get caseUser
     *
     * @return \AppBundle\Entity\User 
     */
    public function getCaseUser()
    {
        return $this->caseUser;
    }

    /**
     * Set caseClin
     *
     * @param \AppBundle\Entity\Clinicas $caseClin
     * @return Casos
     */
    public function setCaseClin(\AppBundle\Entity\Clinicas $caseClin = null)
    {
        $this->caseClin = $caseClin;

        return $this;
    }

    /**
     * Get caseClin
     *
     * @return \AppBundle\Entity\Clinicas 
     */
    public function getCaseClin()
    {
        return $this->caseClin;
    }
}
